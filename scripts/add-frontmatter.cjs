const fs = require('fs');
const path = require('path');

const postsDir = 'src/content/posts';

// Frontmatter 模板
const frontmatterTemplate = `---
title:
published: 2026-02-04
tags: []
category:
draft: false
---
`;

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
        // 添加 frontmatter
        const newContent = frontmatterTemplate + '\n' + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`✅ ${relativePath} - 已添加 frontmatter`);
        modifiedCount++;
    } else {
        console.log(`⏭️  ${relativePath} - 已有 frontmatter，跳过`);
    }
});

console.log(`\n完成！共修改了 ${modifiedCount} 个文件`);
