/**
 * Created by Etan on 4/27/16.
 */
$(document).ready(function () {
    setTabHeight();
    //set the click behaviour for queuetoggle links
    $(".queuetoggle").on("click", function () {
        $(this).parent().next().toggle('100');
        $(this).find("i").toggle('100');
    });
    $("tbody").sortable({
        cursor: "move",
        handle: ".mover",
        axis: "y",
        update: function (event, ui) {
            $(this).find('tr').each(function (i) {
                $(this).find('td:first input').val(i + 1);
                $(this).data("order", i + 1);
            });
        }
    });
    //set click behaviour for the printer icons
    $(".printerpic").on("click", $(".printerbox"), function () {
        $("#printerinfo").modal("show");
    });
//tooltips
    $(".queue-remove").tooltip({placement: "left", title: "Remove this job"});
    $(".queue-resend").tooltip({placement: "left", title: "Resubmit this job"});
    $(".current-pause").tooltip({placement: "left", title: "Pause running job"});
    $(".current-abort").tooltip({placement: "left", title: "Abort running job"});
    $(".mover").tooltip({placement: "right", title: "Drag to change order"});

    //handle the filtering for all job history
    $('#box').keyup(function () {
        var valThis = this.value.toLowerCase(),
            length = this.value.length;
        if (valThis == "") {
            clearFilter();
        }
        $('.allhistory table tbody tr').addClass("hide");
        $('.allhistory table tbody tr td').each(function () {
            var text = $(this).text(),
                textL = text.toLowerCase(),
                htmlR = '<b>' + text.substr(0, length) + '</b>' + text.substr(length);
            var myhtml = textL.replace(valThis, '<span class="highlight">$&</span>');
            (textL.indexOf(valThis) >= 0) ? $(this).html(myhtml).parent().removeClass("hide") : $(this).html($(this).text());
        });

    });
    //clear field
    $(".clearfield").on("click", function () {
        clearFilter();
    });
});
$(window).resize(function () {
    setTabHeight()
});
function clearFilter() {
    $("#box").val("");
    $('.allhistory table tbody tr').removeClass("hide");
    $('.allhistory table tbody tr td').each(function () {
        $(this).html($(this).text());
    });
}
function setTabHeight() {
    //this makes sure the tab area will fill the available space.
    var footerheight;
    var headerheight;
    var windowhight;

    footerheight = $(".footer").outerHeight();
    headerheight = $(".navbar-header").outerHeight();
    windowhight = $(window).height();
    $(".tab-pane").css("height", windowhight - footerheight - headerheight - 49);
}

function editPrinter() {
    //gets called when printer edit button is clicked
    $("#editprintermodal").modal('show');
}

function login() {
    //gets called when first entering system and when user logs out
    $("#logindialog").modal('show');
}
function reSend() {
    //gets called when first entering system and when user logs out
    $("#resendmodal").modal('show');
}
function infoDialog() {
    $("#infodialog").modal('show');
}
function connectServer() {
    //Gets called when user wants to connect another server
    $("#connectserver").modal('show');
}