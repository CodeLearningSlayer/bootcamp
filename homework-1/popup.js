const openPopup = (trigger, popupSelector, activeClass) => {
	const popup = document.querySelector(popupSelector);
	
    trigger.addEventListener("click", () => {
		popup?.classList.add(activeClass);
	});
};

const closePopup = (trigger, popupSelector, activeClass) => {
	const popup = document.querySelector(popupSelector);
	trigger.addEventListener("click", () => {
		popup?.classList.remove(activeClass);
	});

	document.addEventListener("keydown", (e) => {
		const key = e.key;

		if (key === "Escape") {
			popup?.classList.remove(activeClass);
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target === popup) {
			popup?.classList.remove(activeClass);
		}
	});
};
// !AS IS
// зачем-то вешается событие в хендлерах, когда должно триггериться действие напрямую

// по сути достаточно повесить одно событие клика на триггер и управлять условием в зависимости от активности попапа
// ну и одно событие на keydown

// плюс эти события регистрируются каждый раз на клик без removeListener'a

// последнего хендлера честно не понял. Что если мы кликаем по попапу, он почему-то закрывается, мб тут клик на оверлей имеется в виду?
// если клик на оверлей, то проще просто на весь документ оформить один хендлер клика и различать по e.target

//!TO BE
// В общем порядок оптимизации был бы такой:

// 1) я бы создал что-то вроде утилиты, где определил поведение onOpen и onClose (или вообще просто свел бы их к одному toggle на classList)
// 2) так же бы навесил ОДИН листенер на клик по бэкдропу и ескейпу, которые бы снимал при закрытии попапа
