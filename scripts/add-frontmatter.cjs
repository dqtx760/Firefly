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

// 获取所有 markdown 文件
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`检查 ${files.length} 个文章文件...\n`);

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 检查是否已有 frontmatter（以 --- 开头）
    const hasFrontmatter = content.trimStart().startsWith('---');

    if (!hasFrontmatter) {
        // 添加 frontmatter
        const newContent = frontmatterTemplate + '\n' + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`✅ ${file} - 已添加 frontmatter`);
        modifiedCount++;
    } else {
        console.log(`⏭️  ${file} - 已有 frontmatter，跳过`);
    }
});

console.log(`\n完成！共修改了 ${modifiedCount} 个文件`);
