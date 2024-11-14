const originalTitle = document.title;
const inactiveTitle = "👋 Hej, jeg er her stadig!";

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = inactiveTitle;
    } else {
        document.title = originalTitle;
    }
});
