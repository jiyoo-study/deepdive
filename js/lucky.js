document.addEventListener('DOMContentLoaded', function() {
    new Swiper(".mySwiper", {
        slidesPerView: 3.4, // 한 번에 보여줄 슬라이드 수
        spaceBetween: 32, // 슬라이드 사이 간격
        freeMode: true,
        pagination: {
            clickable: true,
        },
    });
});

const addButtons = document.querySelectorAll('.add-luck-button');
const luckList = document.querySelector('.luck-list');
const totalScoreSpan = document.querySelector('.total-score');

// 운세 항목별 점수와 현재 수량을 저장할 객체
const luckData = {
    '금전운': { score: 10, count: 0 },
    '애정운': { score: 10, count: 0 },
    '건강운': { score: 10, count: 0 },
    '웃음운': { score: 10, count: 0 },
    '음식운': { score: 10, count: 0 },
    '동물운': { score: 10, count: 0 }
};

// '행운 추가하기' 버튼 클릭 이벤트 리스너
addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const luckType = event.target.closest('.swiper-slide').dataset.luckType;

        // 아직 선택되지 않은 항목이라면 리스트에 추가
        if (luckData[luckType].count === 0) {
            addLuckItem(luckType);
        }

        // 해당 항목의 수량 증가
        luckData[luckType].count++;

        // UI 업데이트 함수 호출
        updateLuckList();
        updateTotalScore();
    });
});

// 선택된 항목을 오른쪽 리스트에 추가하는 함수
function addLuckItem(type) {
    const listItem = document.createElement('div');
    listItem.classList.add('luck-item');
    listItem.dataset.luckType = type;
    listItem.innerHTML = `
            <span class="luck-type">${type}</span>
            <div class="counter">
                <button class="minus-btn">-</button>
                <span class="count-display">0</span>
                <button class="plus-btn">+</button>
            </div>
        `;
    luckList.appendChild(listItem);

    // 새로 추가된 항목의 수량 조절 버튼에 이벤트 리스너 추가
    listItem.querySelector('.minus-btn').addEventListener('click', () => {
        if (luckData[type].count > 0) {
            luckData[type].count--;

            if (luckData[type].count === 0) {
                listItem.remove();
            }

            updateLuckList();
            updateTotalScore();

        }
    });

    listItem.querySelector('.plus-btn').addEventListener('click', () => {
        luckData[type].count++;
        updateLuckList();
        updateTotalScore();
    });
}

// 오른쪽 리스트의 UI를 업데이트하는 함수
function updateLuckList() {
    document.querySelectorAll('.luck-item').forEach(item => {
        const type = item.dataset.luckType;
        const countDisplay = item.querySelector('.count-display');

        // 이전 수량과 새로운 수량 비교
        const previousCount = parseInt(countDisplay.textContent);
        const newCount = luckData[type].count;
        
        // 수량이 변경되었을 때만 애니메이션 적용
        if (previousCount !== newCount) {
            // "flash" 클래스 추가하여 색상 변경
            countDisplay.classList.add('flash');

            //"flash" 클래스 제거
            setTimeout(() => {
                countDisplay.classList.remove('flash');
            }, 800);
        }
    
        // 현재 수량으로 UI 업데이트
        countDisplay.textContent = luckData[type].count;
    });
}

// 총 행운지수를 계산하고 표시하는 함수
function updateTotalScore() {
    let totalScore = 0;
    for (const type in luckData) {
        totalScore += luckData[type].score * luckData[type].count;
    }
    totalScoreSpan.textContent = totalScore.toString() + '점';
}