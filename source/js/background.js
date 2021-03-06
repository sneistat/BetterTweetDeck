if(!settings) {
	var settings = new Store("settings", {
	"timestamp": "absolute",
	"full_after_24h": false,
	"name_display": "both",
	"typeahead_display_username_only": false,
	"circled_avatars": false,
	"no_columns_icons": false,
	"yt_rm_button": true,
	"small_icons_compose": true,
	"grayscale_notification_icons": false,
	"url_redirection": true,
	"img_preview_500px": true,
	"img_preview_bandcamp": true,
	"img_preview_cloud": true,
	"img_preview_dailymotion": true,
	"img_preview_deviantart": true,
	"img_preview_dribbble": true,
	"img_preview_droplr": true,
	"img_preview_dropbox": true,
	"img_preview_flickr": true,
	"img_preview_imgly": true,
	"img_preview_imgur": true,
	"img_preview_instagram": true,
	"img_preview_mobyto": true,
	"img_preview_soundcloud": true,
	"img_preview_tumblr": true,
	"img_preview_vimeo": true,
	"img_preview_yfrog": true,
	"blurred_modals": true,
	"only_one_thumbnails": true,
	"minimal_mode": false
	});
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		sendResponse(settings.toObject());
	}
);
function onInstall() {
chrome.tabs.create({url: "fancy-settings/source/index.html?welcome"});
}

function onUpdate() {
chrome.tabs.create({url: "fancy-settings/source/index.html?update"});
}

function getVersion() {
var details = chrome.app.getDetails();
return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
// Check if we just installed this extension.
if (typeof prevVersion == 'undefined') {
  onInstall();
} else {
  if(!(prevVersion.split(".")[0] == currVersion.split(".")[0] && prevVersion.split(".")[1] == currVersion.split(".")[1])) {
  	onUpdate();
  }
}
localStorage['version'] = currVersion;
}