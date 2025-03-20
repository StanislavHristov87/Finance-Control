# Finance-Control
1️⃣ Основни функционалности (задължителни)
✅ Добавяне на приходи и разходи

Въвеждане на сума, категория, дата и описание
Опция за избор между „Приход“ и „Разход“
✅ Категории за разходи и приходи

Разделение на разходи по категории: храна, транспорт, наем, забавления, здраве и т.н.
Приходи: заплата, бонуси, странични доходи
✅ Баланс и статистики

Показване на текущ баланс (приходи - разходи)
Преглед на общи приходи и разходи за месеца
✅ Графики и диаграми

Pie chart (кръгова диаграма) за разходите по категории
Line chart (линейна графика) за приходи и разходи през месеца
✅ Филтриране и сортиране

Филтриране по дата, категория или тип (приход/разход)
Сортиране от най-новите към най-старите
✅ Автентикация с Firebase (Google/Email)

Регистрация и вход с Firebase Authentication
Свързване на потребителските данни с Firestore
✅ Съхранение на данни в Firestore

Всеки потребител вижда само своите записи
Данните се пазят сигурно в базата
2️⃣ Допълнителни функционалности (по избор, но полезни)
🔹 Бюджетни лимити

Опция за задаване на месечен бюджет за различни категории
Известие, ако потребителят надхвърли бюджета
🔹 Повтарящи се разходи (subscriptions)

Добавяне на месечни абонаменти (Netflix, Spotify, наем)
Автоматично отбелязване на тези разходи всеки месец
🔹 Известия и напомняния

Firebase Cloud Messaging (FCM) за нотификации, ако потребителят доближава лимита си
🔹 Експортиране на данни

Опция за изтегляне на отчети в CSV/PDF формат
🔹 Мултивалутна поддръжка

Конвертиране на валути според текущия курс (например с API като OpenExchangeRates)
🔹 Цели за спестяване

Възможност за задаване на спестовни цели (например „Искам да спестя 1000 лв. за ваканция“)