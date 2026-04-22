const fs = require('fs');
const path = require('path');

const postsDir = 'src/content/posts';

// 获取今天的日期
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// 从文章内容中提取第一张图片
function extractFirstImage(content) {
	// 匹配 ![](图片URL) 格式
	const match = content.match(/!\[.*?\]\((.*?)\)/);
	if (match && match[1]) {
		return match[1].trim();
	}
	return '';
}

// 检查文章内容是否为空（frontmatter 之后的内容）
function hasContent(content) {
	// 找到 frontmatter 结束后的内容
	const match = content.match(/^---[\s\S]*?---\n([\s\S]*)$/m);
	if (match && match[1]) {
		// 检查是否有实际内容（不只是空白字符）
		return match[1].trim().length > 0;
	}
	return false;
}

// 根据文件夹路径生成 frontmatter
function generateFrontmatter(folderName, imageUrl = '') {
	let category = '';
	// 根据文件夹名称设置分类
	if (folderName === 'Technical') {
		category = 'Technical';
	} else if (folderName === 'Software') {
		category = 'Software';
	} else if (folderName === 'AIHacks') {
		category = 'AIHacks';
	} else if (folderName === 'Workflow') {
		category = 'Workflow';
	} else if (folderName === 'Xenia') {
		category = 'Xenia';
	} else {
		category = ''; // 其他文件夹留空，让用户手动填写
	}

	// 如果有图片，添加 image 字段
	const imageLine = imageUrl ? `image: ${imageUrl}\n` : '';

	return `---
title:
published: ${getDate()}
tags: []
category: ${category}
draft: false
pinned: false
${imageLine}---
`;
}

// 递归获取所有 markdown 文件
function getAllMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 递归扫描子目录
            getAllMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// 获取所有 markdown 文件
const files = getAllMarkdownFiles(postsDir);

console.log(`检查 ${files.length} 个文章文件...\n`);

let modifiedCount = 0;

files.forEach(filePath => {
    const relativePath = path.relative(postsDir, filePath);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 检查是否已有 frontmatter
    const hasFrontmatter = content.trimStart().startsWith('---');
    
    // 检查是否已有 image 字段
    const hasImage = /^image:\s*/m.test(content);
    
    // 检查文章是否有内容
    const hasPostContent = hasContent(content);

    if (!hasFrontmatter) {
        // 完全没有 frontmatter，全部添加
        const folderName = path.basename(path.dirname(filePath));
        
        let imageUrl = '';
        
        if (hasPostContent) {
            // 文章有内容，提取封面图
            imageUrl = extractFirstImage(content);
        }
        
        const frontmatter = generateFrontmatter(folderName, imageUrl);
        const newContent = frontmatter + '\n' + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');

        let info = '';
        if (folderName === 'Technical' || folderName === 'Software' || folderName === 'AIHacks' || folderName === 'Workflow' || folderName === 'Xenia') {
            info = `[分类: ${folderName}]`;
        } else {
            info = '[未识别分类，请手动填写]';
        }
        
        if (imageUrl) {
            console.log(`✅ ${relativePath} - 已添加 frontmatter ${info} [已提取封面图]`);
        } else {
            console.log(`✅ ${relativePath} - 已添加 frontmatter ${info} [无图片，请手动填写]`);
        }
        modifiedCount++;
    } else if (!hasImage) {
        // 已有 frontmatter 但没有 image 字段，补充 image 字段
        const imageUrl = hasPostContent ? extractFirstImage(content) : '';
        
        // 直接在 pinned: false 后面添加 image 字段
        if (content.includes('pinned: false')) {
            if (imageUrl) {
                content = content.replace('pinned: false', 'pinned: false\nimage: ' + imageUrl);
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`✅ ${relativePath} - 已补充封面图`);
            } else {
                content = content.replace('pinned: false', 'pinned: false\nimage: ');
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`✅ ${relativePath} - 已添加 image 字段 [无图片，请手动填写]`);
            }
        } else if (content.includes('pinned: true')) {
            if (imageUrl) {
                content = content.replace('pinned: true', 'pinned: true\nimage: ' + imageUrl);
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`✅ ${relativePath} - 已补充封面图`);
            } else {
                content = content.replace('pinned: true', 'pinned: true\nimage: ');
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`✅ ${relativePath} - 已添加 image 字段 [无图片，请手动填写]`);
            }
        } else {
            // 兜底：在最后一行之前添加
            content = content.replace(/\n$/, '\nimage: \n');
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✅ ${relativePath} - 已添加 image 字段 [无图片，请手动填写]`);
        }
        modifiedCount++;
    } else {
        console.log(`⏭️  ${relativePath} - 已有 frontmatter 和 image，跳过`);
    }
});

console.log(`\n完成！共修改了 ${modifiedCount} 个文件`);
