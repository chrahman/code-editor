if (window.addEventListener) {
    window.addEventListener("resize", browserResize);
  } else if (window.attachEvent) {
    window.attachEvent("onresize", browserResize);
  }
  var xbeforeResize = window.innerWidth;

  function browserResize() {
    var afterResize = window.innerWidth;
    if ((xbeforeResize < (970) && afterResize >= (970)) || (xbeforeResize >= (970) && afterResize < (970)) ||
      (xbeforeResize < (728) && afterResize >= (728)) || (xbeforeResize >= (728) && afterResize < (728)) ||
      (xbeforeResize < (468) && afterResize >= (468)) || (xbeforeResize >= (468) && afterResize < (468))) {
      xbeforeResize = afterResize;
    }
    if (window.screen.availWidth <= 768) {
      restack(window.innerHeight > window.innerWidth);
    }
    fixDragBtn();
    showFrameSize();
  }

  
   // Get the modal
   var modal = document.getElementById("myModal");
   // When the user clicks the button, open the modal 
   function open_model() {
     modal.style.display = "block";
   }
   // When the user clicks on <span> (x), close the modal
   function hideAndResetModal() {
     modal.style.display = "none";
   }

   // Get the nmodal
   var nmodal = document.getElementById("nmyModal");
   // When the user clicks the button, open the modal 
   function open_nmodel() {
     nmodal.style.display = "block";
   }
   // When the user clicks on <span> (x), close the modal
   function nhideAndResetModal() {
     nmodal.style.display = "none";
   }

   // end modal and download file starts here
   function download() {
     var text = document.querySelector("#textareaCode").value;
     var filename = document.querySelector("#editor-filename").value;
     var element = document.createElement('a');
     element.href = 'data:unknown/plain;charset=utf-8,' + encodeURIComponent(text);
     element.download = filename;
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();

     document.body.removeChild(element);
   }
   // end of download file

   submitTryit()

   function submitTryit(n) {
     if (window.editor) {
       window.editor.save();
     }
     var text = document.getElementById("textareaCode").value;
     var ifr = document.createElement("iframe");
     ifr.setAttribute("frameborder", "0");
     ifr.setAttribute("id", "iframeResult");
     ifr.setAttribute("name", "iframeResult");
     ifr.setAttribute("allowfullscreen", "true");
     document.getElementById("iframewrapper").innerHTML = "";
     document.getElementById("iframewrapper").appendChild(ifr);
       var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
       ifrw.document.open();
       ifrw.document.write(text);
       ifrw.document.close();
       //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
       //(and back to false to prevent the content from being editable)
       //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
       if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
         ifrw.document.body.contentEditable = true;
         ifrw.document.body.contentEditable = false;
       }
   }
   var currentStack = true;
   if ((window.screen.availWidth <= 768 && window.innerHeight > window.innerWidth) || "" == " horizontal") { restack(true); }
   function restack(horizontal) {
     var tc, ic, t, i, c, f, sv, sh, d, height, flt, width;
     tc = document.getElementById("textareacontainer");
     ic = document.getElementById("iframecontainer");
     t = document.getElementById("textarea");
     i = document.getElementById("iframe");
     c = document.getElementById("container");
     sv = document.getElementById("stackV");
     sh = document.getElementById("stackH");
     tc.className = tc.className.replace("horizontal", "");
     ic.className = ic.className.replace("horizontal", "");
     t.className = t.className.replace("horizontal", "");
     i.className = i.className.replace("horizontal", "");
     c.className = c.className.replace("horizontal", "");
     if (sv) { sv.className = sv.className.replace("horizontal", "") };
     if (sv) { sh.className = sh.className.replace("horizontal", "") };
     stack = "";
     if (horizontal) {
       tc.className = tc.className + " horizontal";
       ic.className = ic.className + " horizontal";
       t.className = t.className + " horizontal";
       i.className = i.className + " horizontal";
       c.className = c.className + " horizontal";
       if (sv) { sv.className = sv.className + " horizontal" };
       if (sv) { sh.className = sh.className + " horizontal" };
       stack = " horizontal";
       document.getElementById("textareacontainer").style.height = "50%";
       document.getElementById("iframecontainer").style.height = "50%";
       document.getElementById("textareacontainer").style.width = "100%";
       document.getElementById("iframecontainer").style.width = "100%";
       currentStack = false;
     } else {
       document.getElementById("textareacontainer").style.height = "100%";
       document.getElementById("iframecontainer").style.height = "100%";
       document.getElementById("textareacontainer").style.width = "50%";
       document.getElementById("iframecontainer").style.width = "50%";
       currentStack = true;
     }
     fixDragBtn();
     showFrameSize();
   }
   function showFrameSize() {
     var t;
     var width, height;
     width = Number(clonew3_getStyleValue(document.getElementById("iframeResult"), "width").replace("px", "")).toFixed();
     height = Number(clonew3_getStyleValue(document.getElementById("iframeResult"), "height").replace("px", "")).toFixed();
     document.getElementById("framesize").innerHTML = "Result Size: <span>" + width + " x " + height + "</span>";
   }
   var dragging = false;
   var stack;
   function fixDragBtn() {
     var textareawidth, leftpadding, dragleft, containertop, buttonwidth
     var containertop = Number(clonew3_getStyleValue(document.getElementById("container"), "top").replace("px", ""));
     if (stack != " horizontal") {
       document.getElementById("dragbar").style.width = "5px";
       textareasize = Number(clonew3_getStyleValue(document.getElementById("textareawrapper"), "width").replace("px", ""));
       leftpadding = Number(clonew3_getStyleValue(document.getElementById("textarea"), "padding-left").replace("px", ""));
       buttonwidth = Number(clonew3_getStyleValue(document.getElementById("dragbar"), "width").replace("px", ""));
       textareaheight = clonew3_getStyleValue(document.getElementById("textareawrapper"), "height");
       dragleft = textareasize + leftpadding + (leftpadding / 2) - (buttonwidth / 2);
       document.getElementById("dragbar").style.top = containertop + "px";
       document.getElementById("dragbar").style.left = dragleft + "px";
       document.getElementById("dragbar").style.height = textareaheight;
       document.getElementById("dragbar").style.cursor = "col-resize";

     } else {
       document.getElementById("dragbar").style.height = "5px";
       if (window.getComputedStyle) {
         textareawidth = window.getComputedStyle(document.getElementById("textareawrapper"), null).getPropertyValue("height");
         textareaheight = window.getComputedStyle(document.getElementById("textareawrapper"), null).getPropertyValue("width");
         leftpadding = window.getComputedStyle(document.getElementById("textarea"), null).getPropertyValue("padding-top");
         buttonwidth = window.getComputedStyle(document.getElementById("dragbar"), null).getPropertyValue("height");
       } else {
         dragleft = document.getElementById("textareawrapper").currentStyle["width"];
       }
       textareawidth = Number(textareawidth.replace("px", ""));
       leftpadding = Number(leftpadding.replace("px", ""));
       buttonwidth = Number(buttonwidth.replace("px", ""));
       dragleft = containertop + textareawidth + leftpadding + (leftpadding / 2);
       document.getElementById("dragbar").style.top = dragleft + "px";
       document.getElementById("dragbar").style.left = "5px";
       document.getElementById("dragbar").style.width = textareaheight;
       document.getElementById("dragbar").style.cursor = "row-resize";
     }
   }
   function dragstart(e) {
     e.preventDefault();
     dragging = true;
     var main = document.getElementById("iframecontainer");
   }
   function dragmove(e) {
     if (dragging) {
       document.getElementById("shield").style.display = "block";
       if (stack != " horizontal") {
         var percentage = (e.pageX / window.innerWidth) * 100;
         if (percentage > 5 && percentage < 98) {
           var mainPercentage = 100 - percentage;
           document.getElementById("textareacontainer").style.width = percentage + "%";
           document.getElementById("iframecontainer").style.width = mainPercentage + "%";
           fixDragBtn();
         }
       } else {
         var containertop = Number(clonew3_getStyleValue(document.getElementById("container"), "top").replace("px", ""));
         var percentage = ((e.pageY - containertop + 20) / (window.innerHeight - containertop + 20)) * 100;
         if (percentage > 5 && percentage < 98) {
           var mainPercentage = 100 - percentage;
           document.getElementById("textareacontainer").style.height = percentage + "%";
           document.getElementById("iframecontainer").style.height = mainPercentage + "%";
           fixDragBtn();
         }
       }
       showFrameSize();
     }
   }
   function dragend() {
     document.getElementById("shield").style.display = "none";
     dragging = false;
     var vend = navigator.vendor;
     if (window.editor && vend.indexOf("Apple") == -1) {
       window.editor.refresh();
     }
   }
   if (window.addEventListener) {
     document.getElementById("dragbar").addEventListener("mousedown", function (e) { dragstart(e); });
     document.getElementById("dragbar").addEventListener("touchstart", function (e) { dragstart(e); });
     window.addEventListener("mousemove", function (e) { dragmove(e); });
     window.addEventListener("touchmove", function (e) { dragmove(e); });
     window.addEventListener("mouseup", dragend);
     window.addEventListener("touchend", dragend);
     window.addEventListener("load", fixDragBtn);
     window.addEventListener("load", showFrameSize);
   }
   function click_savebtn() {
     if (window.editor) {
       window.editor.save();
     }
     document.getElementById('saveModal').style.display = 'block';
   }
   function click_google_savebtn() {
     if (window.editor) {
       window.editor.save();
     }
     document.getElementById('driveSaveModal').style.display = 'block'
   }

   function click_google_loadbtn() {
     document.getElementById('driveLoadModal').style.display = 'block'
   }
   function retheme() {
     var cc = document.body.className;
     if (cc.indexOf("darktheme") > -1) {
       document.body.className = cc.replace("darktheme", "");
       if (opener) { opener.document.body.className = cc.replace("darktheme", ""); }
       localStorage.setItem("preferredmode", "light");
     } else {
       document.body.className += " darktheme";
       if (opener) { opener.document.body.className += " darktheme"; }
       localStorage.setItem("preferredmode", "dark");
     }
   }
   (
     function setThemeMode() {
       var x = localStorage.getItem("preferredmode");
       if (x == "dark") {
         document.body.className += " darktheme";
       }
     })();
   function colorcoding() {
     var ua = navigator.userAgent;
     //Opera Mini refreshes the page when trying to edit the textarea.
     if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
     window.editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
       mode: "text/html",
       htmlMode: true,
       lineWrapping: true,
       smartIndent: false,
       addModeClass: true
     });
     //  window.editor.on("change", function () {window.editor.save();});
   }
   colorcoding();

   function clonew3_getStyleValue(elmnt, style) {
     if (window.getComputedStyle) {
       return window.getComputedStyle(elmnt, null).getPropertyValue(style);
     } else {
       return elmnt.currentStyle[style];
     }
   }

  var input_textarea = editor.getValue();

  if (localStorage.getItem("content")) {
      editor.getDoc().setValue(localStorage.getItem('content'));
  }
  editor.on("change", function() {
  	localStorage.setItem('content', editor.getValue());
  })
