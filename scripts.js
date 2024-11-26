document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('embedForm');
    const preview = document.getElementById('preview');
    function updatePreview() {
        console.log('Updating preview...');
        const embed = {
            title: form.title.value,
            description: form.description.value,
            color: form.color.value,
            author: form.author.value,
            thumbnail: form.thumbnail.value,
            footer: form.footer.value,
            timestamp: form.timestamp.value
        };
        preview.innerHTML = `
            ${embed.author ? `<div style="font-size: 0.875rem; color: #b9bbbe;">${embed.author}</div>` : ''}
            ${embed.title ? `<div style="font-weight: bold; margin: 0.5rem 0;">${embed.title}</div>` : ''}
            ${embed.description ? `<div>${embed.description}</div>` : ''}
            ${embed.thumbnail ? `<img src="${embed.thumbnail}" style="max-width: 100%; margin-top: 0.5rem;">` : ''}
            ${embed.footer ? `<div style="font-size: 0.75rem; color: #b9bbbe; margin-top: 0.5rem;">${embed.footer}</div>` : ''}
            ${embed.timestamp ? `<div style="font-size: 0.75rem; color: #b9bbbe; margin-top: 0.5rem;">${new Date(embed.timestamp).toLocaleString()}</div>` : ''}
        `;
        preview.style.borderColor = embed.color;
        console.log('Preview updated');
    }
    function copyEmbed() {
        const embed = {
            title: form.title.value,
            description: form.description.value,
            color: form.color.value.replace('#', ''),
            author: { name: form.author.value },
            thumbnail: { url: form.thumbnail.value },
            footer: { text: form.footer.value },
            timestamp: form.timestamp.value ? new Date(form.timestamp.value).toISOString() : null
        };
        navigator.clipboard.writeText(JSON.stringify(embed, null, 2));
    }
    form.addEventListener('input', updatePreview);
    const colorInput = document.getElementById('color');
    colorInput.addEventListener('input', updatePreview);
    colorInput.addEventListener('change', () => {
        colorInput.value = colorInput.value.toUpperCase();
        updatePreview();
    });
    updatePreview();
    window.copyEmbed = copyEmbed;
});