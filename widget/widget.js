(function() {
    const iframe = document.createElement('iframe');
    iframe.setAttribute("src", "http://localhost:3000/");

    
    const widget = document.createElement('div');
        widget.className = "medmis_widget";
    const overlay = document.createElement('div');
    overlay.className = "medmis_widget_overlay";
    const close_btn = document.createElement('div')
          close_btn.className = "medmis_widget_close_btn"
          close_btn.textContent = "X"
    
    overlay.addEventListener('click', function() {
        widget.classList.remove('active_widget');
        overlay.classList.remove('active_overlay')
        document.body.classList.remove('no-scroll')
    })
    close_btn.addEventListener('click', function() {
        widget.classList.remove('active_widget');
        overlay.classList.remove('active_overlay')
        document.body.classList.remove('no-scroll')
    })

    const open_btn = document.createElement('div')
        open_btn.className = "widget_open_btn"
        open_btn.textContent = "Онлайн запись"
        open_btn.addEventListener('click', function() {
            widget.classList.add('active_widget');
            overlay.classList.add('active_overlay');
            document.body.classList.add('no-scroll')
        })

    document.body.insertAdjacentHTML('beforeend', `<style>
        .widget_open_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            right: 50px;
            bottom: 50px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: auto;
            padding: 6px;
            background: #2782cc;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            text-align: center;
            font-family: "Arial";
            font-weight: bold;
            z-index: 999;
        }

        .medmis_widget_overlay {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top:0;
            left:0;
            pointer-events: none;
            opacity:0;
            background-color: rgba(33,33,33,.2);
            transition: all .4s ease;
        }

        .active_overlay {
            opacity:1;
            pointer-events: all;
            z-index: 998;
        }

        .medmis_widget {
            position: fixed;
            top: 0;
            bottom: 0;
            left: auto;
            right: 0;
            height: 100%;
            overflow: hidden;
            box-shadow: 0 8px 12px 2px rgba(0,0,0,.06), 0 3px 15px 5px rgba(0,0,0,.06);
            transition: all .5s ease;
            max-width: 0;
            z-index: 1000;
            width: 100%;
        }
        .medmis_widget iframe {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border: none;
        }
        .medmis_widget.active_widget {
            max-width: 30%;
        }
        .no-scroll {
            overflow:hidden;
        }

        .medmis_widget_close_btn {
            display:none;
            position: fixed;
            font-size: 15px;
            top: 15px;
            right: 15px;
            cursor: pointer;
            z-index: 1005;
            font-family: Arial;
        }
        @media (max-width:1600px) {
            .medmis_widget.active_widget {
                max-width: 50%;
            }
        }
        @media (max-width:1000px) {
            .medmis_widget.active_widget {
                max-width: 80%;
            }
        }
        @media (max-width: 768px) {
            .medmis_widget.active_widget {
                max-width: 100%;
                width: 100%;
            }
            .active_widget .medmis_widget_close_btn {
                display: flex;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(0,0,0,0.6);
                width: 25px;
                height: 25px;
                align-items: center;
                justify-content: center;
            }
        }
    </style>`);

    widget.appendChild(iframe);
    widget.appendChild(close_btn);
    document.body.appendChild(widget);
    document.body.appendChild(open_btn);
    document.body.appendChild(overlay);
    
})()