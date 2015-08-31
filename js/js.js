(function () {

    if (window.File && window.FileReader && window.FileList && window.Blob) {

        var dropArea = document.getElementById("drop-area"),
            fileList = document.getElementById("file-list");

        function handleFiles(files) {

            for (var i = 0, f; f = files[i]; i++) {
                var li = document.createElement("li"),
                    div = document.createElement("div"),
                    img,
                    reader,
                    fileInfo,
                    ext,
                    extplaceholder;

                li.appendChild(div);

                if ((/image/i).test(f.type)) {

                    reader = new FileReader();
                    reader.onload = (function (Image) {
                        return function (e) {
                            var span = document.createElement('span');
                            span.innerHTML = '<img src="' + e.target.result + '" title="' + escape(Image.name) + '"/>';
                            div.appendChild(span);
                        };
                    }(f));
                    reader.readAsDataURL(f);
                } else {

                    if ((/pdf/i).test(f.type)) {
                        ext = 'pdf';
                    } else if ((/word/i).test(f.type)) {
                        ext = 'doc';
                    } else if ((/plain/i).test(f.type)) {
                        ext = 'txt';
                    } else {
                        ext = 'unknown';
                    }

                    extplaceholder = '<span><img src="img/' + ext + '.png"  /></span>';


                }

                // Present file info and append it to the list of files
                fileInfo = "<div><ul><li><strong>Name:</strong> " + f.name + "</li>";
                fileInfo += "<li><strong>Size:</strong> " + parseInt(f.size / 1024, 10) + " kb</li>";
                fileInfo += "<li><strong>Type:</strong> " + f.type + "</li></ul></div>";
                if (extplaceholder) {
                    fileInfo += extplaceholder;
                }
                div.innerHTML = fileInfo;

                fileList.appendChild(li);
            }
        }

        dropArea.addEventListener("dragleave", function (e) {
            var target = e.target;

            if (target && target === dropArea) {
                this.className = "";
            }
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropArea.addEventListener("dragenter", function (e) {
            this.className = "over";
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropArea.addEventListener("dragover", function (e) {
            this.className = "over";
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropArea.addEventListener("drop", function (e) {
            handleFiles(e.dataTransfer.files);
            this.className = "";
            e.preventDefault();
            e.stopPropagation();
        }, false);


    } else {
        fileList.innerHTML = "No support for the File API in this web browser";
    }

})();	
