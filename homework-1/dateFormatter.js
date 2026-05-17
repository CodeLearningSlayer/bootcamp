const DEFAULT_OFFSET = 0;
const DEFAULT_FORMAT = 'ISO';
const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
const DAYS_OF_THE_WEEK = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
}
const DATE_FORMATS = {
    ISO: 'ISO',
    UTC: 'UTC',
    LOCAL: 'LOCAL'
}

class DateCore {
    createValidDate(inputDate) {
        const date = new Date(inputDate);

        if (isNaN(date)) {
            throw new Error('Invalid date');
        }

        return date;
    }

    applyOffset(date, hours) {
        return new Date(date.getTime() + hours * MILLISECONDS_IN_HOUR);
    }

    // в целом это не используется пока что, можно спилить
    isWeekend(date) {
        const day = date.getDay();
        return day === DAYS_OF_THE_WEEK.SUNDAY || day === DAYS_OF_THE_WEEK.SATURDAY;
    }
}

class DateFormatter {
    getDateByDateFormat(date, format) {
        switch (format) {
            case DATE_FORMATS.ISO:
                return date.toISOString();
            case DATE_FORMATS.UTC:
                return date.toUTCString();
            case DATE_FORMATS.LOCAL:
                return date.toLocaleString();
        }
    }

    getDateWithLocalTime(date) {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    getDateByLengthFormat(date, format) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        if (format === 'short') {
            return `${day}/${month}/${year}`;
        }

        return `${day} - ${month} - ${year}`;
    }


    // в целом это не используется пока что, можно спилить
    // я б вообще не стал это в класс заносить, использовал бы только в месте вывода как утилиту
    getCapitalizedDateString(str) {
        if (typeof str !== 'string') {
            return '';
        }

        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
}

class DateProcessor {
    // тут можем в целом инициализировать классы напрямую
    constructor(core, formatter) {
        this.core = core;
        this.formatter = formatter;
    }

    processDate({
        inputDate,
        includeTime = false,
        extraOffsetHours = 0,
        config = {
                offsetHours: DEFAULT_OFFSET,
                format: DEFAULT_FORMAT
            }
    }) {
        const date = this.core.createValidDate(inputDate);
        const totalOffsetHours = config.offsetHours + extraOffsetHours;
        const dateWithOffset = this.formatter.applyOffset(date, totalOffsetHours);
        return includeTime ? this.formatter.getDateWithLocalTime(dateWithOffset) : this.formatter.getDateByDateFormat(dateWithOffset, config.format)
    }
}

// был какой-то сильно размытый по функционалу класс, который я решил разбить на кор логику и логику вывода и агрегирующий класс с инъекцией первых двух
// так же тут есть пара функций, которые бы я вообще предпочел удалить (но видимо из-за этого, что это выдернуто с контекста, то оставил)
// конечно для небольших проектов мб и не стоит так заморачиваться, а просто пробежаться по непонятным "магическим числам" и раздробить логику супер-метода на несколько более понятных, тк суть ясна
