function member_widget_click_handler() {
   jQuery(".widget div#members-list-options a").on("click", function() {
       var e = this;
       return jQuery(e).addClass("loading"),
       jQuery(".widget div#members-list-options a").removeClass("selected"),
       jQuery(this).addClass("selected"),
       jQuery.post(ajaxurl, {
           action: "widget_members",
           cookie: encodeURIComponent(document.cookie),
           _wpnonce: jQuery("input#_wpnonce-members").val(),
           "max-members": jQuery("input#members_widget_max").val(),
           filter: jQuery(this).attr("id")
       }, function(t) {
           jQuery(e).removeClass("loading"),
           member_widget_response(t)
       }),
       !1
   })
}
function member_widget_response(e) {
   e = e.substr(0, e.length - 1),
   "-1" !== (e = e.split("[[SPLIT]]"))[0] ? jQuery(".widget ul#members-list").fadeOut(200, function() {
       jQuery(".widget ul#members-list").html(e[1]),
       jQuery(".widget ul#members-list").fadeIn(200)
   }) : jQuery(".widget ul#members-list").fadeOut(200, function() {
       var t = "<p>" + e[1] + "</p>";
       jQuery(".widget ul#members-list").html(t),
       jQuery(".widget ul#members-list").fadeIn(200)
   })
}
jQuery(document).ready(function() {
   member_widget_click_handler(),
   "undefined" != typeof wp && wp.customize && wp.customize.selectiveRefresh && wp.customize.selectiveRefresh.bind("partial-content-rendered", function() {
       member_widget_click_handler()
   })
});
