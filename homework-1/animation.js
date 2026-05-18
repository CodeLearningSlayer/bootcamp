export const clearXPosition = (target) =>
	gsap.to(target, {
		xPercent: 0,
		repeat: 0,
		ease: "none",
		duration: 0.4,
	});

export const clearYPosition = (target) =>
	gsap.to(target, {
		yPercent: 0,
		repeat: 0,
		ease: "none",
		duration: 0.4,
	});

export const moveLeft = (target) =>
	gsap.to(target, {
		xPercent: -120,
		repeat: 0,
		ease: "none",
		duration: 0.3,
	});

export const moveRight = (target) =>
	gsap.to(target, {
		xPercent: 120,
		repeat: 0,
		ease: "none",
		duration: 0.3,
	});

export const moveTop = (target) =>
	gsap.to(target, {
		yPercent: -120,
		repeat: 0,
		ease: "none",
		duration: 0.3,
	});

export const moveFromLeft = (target) =>
	gsap.from(target, {
		xPercent: 120,
		repeat: 0,
		ease: "none",
		duration: 0.3,
	});

export const moveFromRight200 = (target) =>
	gsap.from(target, {
		xPercent: -200,
		repeat: 0,
		ease: "none",
		duration: 0.4,
	});

// тут достаточно завести словарь потенциальных перемещений (если есть фиксированная величина) и дать управляющие аргументы
// вроде direction (по которым определять знак до числа (направление перемещение))
// duration сделать необязательным аргументом, учитывать дефолтное значение, если он не передан

// убрать повторение, ведь логически moveFromLeft === moveRight. Свести все движения к виду "вверх", "влево", "вниз", "вправо"
// ну и в зависимости от возможности перемещения на разные проценты расширить функционал (либо по передаче смещения в процентах, либо просто описать все варианты, если их немного)

clearPosition = (axis, target) => {
    if (axis === "X") {
        gsap.to(target, {
            xPercent: 0,
            repeat: 0,
            ease: "none",
            duration: 0.4,
        })
    }

    if (axis === "Y") {
        gsap.to(target, {
            yPercent: 0,
            repeat: 0,
            ease: "none",
            duration: 0.4,
        });
    }
}

moveTarget = (direction, target, config = {percent: 120, duration: 0.3}) => {
    if (direction === "top") {} // описание мува
    if (direction === "down") {} // описание мува
    if (direction === "left") {} // описание мува
    if (direction === "right") {} // описание мува
}

// ===============================================

function init(origin, destination, direction, trigger) {
	const isDesktopMedia = window.matchMedia("(min-width: 1200px)").matches; // тут можно еще и по юзер-агенту

	if (origin.index == 0 && direction == "down") {
		moveLeft(document.querySelector(".cta"));

		moveRight(document.querySelector(".mg"));
	} else if (origin.index == 1 && direction == "up") {
		clearXPosition(document.querySelector(".cta"));

		clearXPosition(document.querySelector(".img"));
	}

	if (destination.index == 0 && direction == "up" && isDesktopMedia) {
		clearXPosition(document.querySelector(".cta"));

		clearXPosition(document.querySelector(".img"));

		clearYPosition(document.querySelector(".block"));

		clearXPosition(document.querySelector(".grid"));
	}

	if (origin.index == 0 && direction == "down" && isDesktopMedia) {
		moveTop(document.querySelector(".block"));
		destination.item.classList.add("bg");
	} else if (origin.index == 1 && direction == "up" && isDesktopMedia) {
		clearYPosition(document.querySelector(".block"));
		origin.item.classList.remove("bg");
	}

	if (origin.index == 2 && direction == "up" && isDesktopMedia) {
		destination.item.classList.add("bg");
	}

	if (origin.index == 1 && direction == "down") {
		moveRight(document.querySelector(".grid"));
	} else if (origin.index == 2 && direction == "up") {
		clearXPosition(document.querySelector(".grid"));
	}

	if (origin.index == 2 && direction == "down") {
		moveRight(document.querySelector(".container"));
		moveRight(document.querySelector(".mobile-text"));
	} else if (origin.index == 3 && direction == "up") {
		clearXPosition(document.querySelector(".container"));
		clearXPosition(document.querySelector(".mobile-text"));
	}
}

// тут бы я попробовал как минимум описать все в табличном виде или попробовал бы собрать FSM
// это помогло бы сделать более масштабируемым этот код, для добавления перемещений достаточно добавить 1 объект
// логику для десктопа вынес бы отдельно, чтоб разделить логику явно на мобильную и десктопную версии (просто еще одна fsm/таблица)

// выглядело бы это как-то так

const fsm = {
  0: { // в ключе origin.index, в значении след положение и actions
    down: { next: 1, actions: ["blockMoveDown"] },
  },

  1: {
    up: { next: 0, actions: ["blockMoveUp"] },
    down: { next: 2, actions: ["blockMoveDown"] },
  },

  2: {
    up: { next: 1, actions: ["section1In"] },
    down: { next: 3, actions: ["section2Out"] },
  },

  3: {
    up: { next: 2, actions: ["section2In"] },
  },
};


const actions = {
  blockMoveDown: (ctx) => {
    moveLeft(ctx.elements.cta);
    moveRight(ctx.elements.img);
  },

  blockMoveUp: (ctx) => {
    clearPosition("x", ctx.elements.cta);
    clearPosition("x", ctx.elements.img);
  },
};

// ctx - контекст с блоком, который мы собираемся двигать
const elements = {
  cta: document.querySelector(".cta"),
  img: document.querySelector(".img"),
  block: document.querySelector(".block"),
  grid: document.querySelector(".grid"),
};

