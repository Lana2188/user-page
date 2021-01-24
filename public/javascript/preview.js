function showPreview(event) {
    if (event.target.files.length > 0) {
        let imgLink = URL.createObjectURL(event.target.files[0])
        let img = document.getElementById('img')
        img.src = imgLink
    }
};


function showBgPreview(event) {
    if (event.target.files.length > 0) {
        let bgLink = URL.createObjectURL(event.target.files[0])
        let bg = document.getElementById('bg')
        bg.style.backgroundImage = `url(${bgLink})`
    }
};