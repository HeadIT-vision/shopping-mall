document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    console.log('currentPath:', currentPath);

    // 메뉴 항목들을 가져옵니다.
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const menuLink = item; // item 자체가 <a> 태그입니다.
        const menuIcon = menuLink.querySelector('img'); // <a> 태그 안의 <img> 태그를 찾습니다.

        if (currentPath.includes(menuLink.getAttribute('href'))) {
            item.classList.add('active');
            menuIcon.classList.add('selected');
        } else {
            item.classList.remove('active');
            menuIcon.classList.remove('selected');
        }
    });
});
