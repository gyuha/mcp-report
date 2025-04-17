// 행동심리학 웹사이트 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 하이라이트
    highlightCurrentPage();
    
    // 목차 생성 (큰 페이지에서)
    generateTableOfContents();
    
    // 스크롤 시 헤더 스타일 변경
    setupScrollHeader();
});

// 현재 페이지 네비게이션 항목 하이라이트
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
}

// 큰 페이지에서 목차 자동 생성
function generateTableOfContents() {
    // 목차 컨테이너가 있는지 확인
    const tocContainer = document.getElementById('toc');
    if (!tocContainer) return;
    
    const headings = document.querySelectorAll('main h2');
    if (headings.length < 3) return; // 제목이 충분히 많을 때만 목차 생성
    
    const tocList = document.createElement('ul');
    tocContainer.appendChild(tocList);
    
    headings.forEach(heading => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // 아이디가 없으면 생성
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        }
        
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
}

// 스크롤 시 헤더 스타일 변경
function setupScrollHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 이미지 모달 설정
function setupImageModal() {
    const images = document.querySelectorAll('main img:not(.no-modal)');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                this.remove();
            });
        });
        
        // 커서 스타일을 포인터로 변경하여 클릭 가능함을 표시
        img.style.cursor = 'pointer';
    });
}