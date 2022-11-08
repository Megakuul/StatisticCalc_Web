export const dialogid = "dialogid";
export const closeid = "closeBtn";
export let created = false;
export function createDialog(parentid, body, backgroundColor = "#fefefe") {
    if (created)
        return;
    document.getElementById(parentid).innerHTML += `
        <style>
            .dialog {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.7);
            }
            .dialog-content {
            background-color: ${backgroundColor};
            margin: auto;
            padding: 20px;
            border-radius: 20px;
            width: 25%;
            }
            .close {
            color: #3d5c5c;
            float: right;
            font-size: 30px;
            font-weight: bold;
            }
            .close:hover,
            .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
            }
        </style>

        <div id=${dialogid} class="dialog">
            <div class="dialog-content">
                <span id=${closeid} class="close">&times;</span>
                ${body}
            </div>
        </div>
    `;
    let dialog = document.getElementById(dialogid);
    let closebtn = document.getElementById(closeid);
    created = true;
    closebtn.onclick = function () {
        dialog.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == dialog)
            dialog.style.display = "none";
    };
}
export function showDialog() {
    if (created)
        document.getElementById(dialogid).style.display = "block";
}
export function rewrapBody(newBody) {
    if (created) {
        document.getElementById(dialogid).innerHTML = `
        <div class="dialog-content">
                <span id=${closeid} class="close">&times;</span>
                ${newBody}
        </div>
        `;
    }
}
//# sourceMappingURL=DialogBox.js.map