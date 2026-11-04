import { messageTable, userTable } from "./schema";
import {db} from "./index";

const intros = [
    "Слушай,", "Кстати,", "Ребята,", "Народ,", "Кто в курсе,", "Вопрос такой:",
    "Всем привет,", "Только что проверил:", "Короче,", "В общем,", "Тут такое дело:",
    "Минутку внимания,", "Зацените:", "Если что,", "Честно говоря,"
];

const subjects = [
    "сокет-соединение", "авторизация через JWT", "пагинация по курсору", "база в Docker",
    "новый endpoint в Express", "Drizzle схема", "валидация Zod", "клиентский стор Zustand",
    "скролл сообщений", "Next.js App Router", "типизация в TypeScript", "контейнер в докере",
    "тренировочный план", "жим лёжа", "становая тяга", "присед", "репозиторий на гите",
    "код-ревью", "коммит в ветку", "рендер компонентов"
];

const actions = [
    "работает вообще без задержек", "упало с непонятной ошибкой", "работает на удивление стабильно",
    "надо будет еще раз перепроверить", "пока тестируется локально", "выдало ошибку валидации",
    "ведет себя странно при быстрой отправке", "уже готово к деплою", "показывает отличный перформанс",
    "требует небольшого рефакторинга", "залито в прод", "проходит все тесты", "выглядит очень чисто"
];

const conclusions = [
    "Кто может глянуть?", "Позже отпишу результат.", "Есть мысли почему?", "Сейчас закину фикс.",
    "Вроде пофиксил.", "Завтра продолжим.", "Тестим дальше.", "Смотрится отлично!",
    "Надо будет запушить.", "Как освободишься — чекни.", "У кого так же было?", "Всё сходится."
];

function generateUniquePhrase(index: number): string {
    const intro = intros[index % intros.length];
    const sub = subjects[(index * 3) % subjects.length];
    const act = actions[(index * 7) % actions.length];
    const conc = conclusions[(index * 11) % conclusions.length];

    const variant = index % 4;

    switch (variant) {
        case 0:
            return `${intro} ${sub} ${act}. ${conc}`;
        case 1:
            return `${sub} ${act}.`;
        case 2:
            return `${intro} ${sub} ${act}?`;
        default:
            return `${conc} ${sub} ${act}.`;
    }
}

async function seed1000Messages() {
    console.log("Запуск генерации 1000 сообщений...");

    const users = await db.select({ id: userTable.id }).from(userTable);

    if (users.length === 0) {
        console.error("В таблице users пусто. Сначала зарегистрируйте пользователей!");
        process.exit(1);
    }

    const userIds = users.map((u) => u.id);
    const totalCount = 1000;
    const now = Date.now();
    const averageStepMs = 2 * 60 * 1000;

    const messagesToInsert = [];

    for (let i = totalCount; i >= 1; i--) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const text = generateUniquePhrase(i);

        const jitter = Math.floor(Math.random() * 40000) - 20000;
        const msgDate = new Date(now - i * averageStepMs + jitter);

        messagesToInsert.push({
            userId: randomUserId,
            message: text,
            date: msgDate,
        });
    }

    const BATCH_SIZE = 250;
    for (let i = 0; i < messagesToInsert.length; i += BATCH_SIZE) {
        const batch = messagesToInsert.slice(i, i + BATCH_SIZE);
        await db.insert(messageTable).values(batch);
        console.log(`Вставлено: ${Math.min(i + BATCH_SIZE, totalCount)} / ${totalCount}`);
    }

    console.log("Успешно сгенерировано и добавлено 1000 уникальных сообщений!");
    process.exit(0);
}

seed1000Messages().catch((err) => {
    console.error("Ошибка при сидинге:", err);
    process.exit(1);
});