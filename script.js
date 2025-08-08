const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const btnReset = document.getElementById('btn-reset');
const btnExport = document.getElementById('btn-export');
const btnCopy = document.getElementById('btn-copy');

const sampleMarkdown =`
---

## **📄 Markdown Examples to Try**

### 1. **Headings**

\`\`\`md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`

---

### 2. **Text styles**

\`\`\`md
**Bold text**
*Italic text*
***Bold + Italic***
~~Strikethrough~~
\`\`\`

---

### 3. **Lists**

#### Unordered

\`\`\`md
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
\`\`\`

#### Ordered

\`\`\`md
1. First
2. Second
   1. Sub item
   2. Sub item
\`\`\`

---

### 4. **Links & Images**

[OpenAI](https://openai.com)

![Sample Image](https://picsum.photos/300/200)

---

### 5. **Blockquotes**

\`\`\`md
> This is a blockquote.
> It can span multiple lines.
\`\`\`

---

### 6. **Code**

#### Inline

\`\`\`md
Here is some \`inline code\`.
\`\`\`

#### Block

\`\`\`\`md
\`\`\`javascript
function greet(name) {
    console.log("Hello " + name);
}
greet("Thanos");
\`\`\`
\`\`\`\`

---

### 7. **Horizontal Rule**
\`\`\`md
---
\`\`\`

---

### 8. **Tables**

\`\`\`md
| Name    | Age | Role        |
|---------|-----|-------------|
| Alice   | 25  | Developer   |
| Bob     | 30  | Designer    |
| Charlie | 28  | Product Mgr |
\`\`\`

---

### 9. **Task Lists**

\`\`\`md
- [x] Write Markdown
- [ ] Add animations
- [x] Test previewer
\`\`\`

---

### 10. **Nested Formatting**

1. **Bold list item**
2. *Italic list item*
3. [Link in list](https://example.com)
4. Image in list: ![Alt](https://picsum.photos/50)

---
`;


function updatePreview() {
  const rawMarkdown = editor.value;
  const html = marked.parse(rawMarkdown);
  preview.innerHTML = DOMPurify.sanitize(html);
}

editor.addEventListener('input', updatePreview);

// Reset button
btnReset.addEventListener('click', () => {
  editor.value = sampleMarkdown;
  updatePreview();
});

// Export button
btnExport.addEventListener('click', () => {
  const blob = new Blob([preview.innerHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'preview.html';
  a.click();
  URL.revokeObjectURL(url);
});

// Copy button
btnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.innerHTML);
    alert('HTML copied to clipboard!');
  } catch {
    alert('Failed to copy.');
  }
});

// Initialize
editor.value = sampleMarkdown;
updatePreview();
