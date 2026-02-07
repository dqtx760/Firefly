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

// 根据文件夹路径生成 frontmatter
function generateFrontmatter(folderName) {
	let category = '';
	// 根据文件夹名称设置分类
	if (folderName === 'Technical') {
		category = 'Technical';
	} else if (folderName === 'Software') {
		category = 'Software';
	} else if (folderName === 'AIHacks') {
		category = 'AIHacks';
	} else {
		category = ''; // 其他文件夹留空，让用户手动填写
	}

	return `---
title:
published: ${getDate()}
tags: []
category: ${category}
draft: false
pinned: false
---
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

    // 检查是否已有 frontmatter（以 --- 开头）
    const hasFrontmatter = content.trimStart().startsWith('---');

    if (!hasFrontmatter) {
        // 获取文件所在的文件夹名称
        const folderName = path.basename(path.dirname(filePath));

        // 根据文件夹生成对应的 frontmatter
        const frontmatter = generateFrontmatter(folderName);

        // 添加 frontmatter
        const newContent = frontmatter + '\n' + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');

        // 显示分类信息
        const categoryInfo = folderName === 'Technical' || folderName === 'Software' || folderName === 'AIHacks'
            ? `[分类: ${folderName}]`
            : `[未识别分类，请手动填写]`;
        console.log(`✅ ${relativePath} - 已添加 frontmatter ${categoryInfo}`);
        modifiedCount++;
    } else {
        console.log(`⏭️  ${relativePath} - 已有 frontmatter，跳过`);
    }
});

console.log(`\n完成！共修改了 ${modifiedCount} 个文件`);
