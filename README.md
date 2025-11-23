<div align="center">
<h1><a id="intro"> Infopage <sup></sup></a><br></h1>
<a href="https://docs.github.com/en"><img src="https://img.shields.io/static/v1?logo=github&logoColor=fff&label=&message=Docs&color=36393f&style=flat" alt="GitHub Docs"></a>
<a href="https://daringfireball.net/projects/markdown"><img src="https://img.shields.io/static/v1?logo=markdown&logoColor=fff&label=&message=Markdown&color=36393f&style=flat" alt="Markdown"></a> 
<a href="https://symbl.cc/en/unicode-table"><img src="https://img.shields.io/static/v1?logo=unicode&logoColor=fff&label=&message=Unicode&color=36393f&style=flat" alt="Unicode"></a> 
<a href="https://shields.io"><img src="https://img.shields.io/static/v1?logo=shieldsdotio&logoColor=fff&label=&message=Shields&color=36393f&style=flat" alt="Shields"></a>
<img src="https://img.shields.io/badge/Contributor-Шмаков_И._С.-8b9aff" alt="Contributor Badge"></a></div>

***

<br>Салют :wave:,</br>


<div align="center"><h3>Stay tuned ;)</h3></div> 



*** 

### Этапы реализации
    


***



### Структура репозитория

```
├── assets
│   ├── logotype
│   │   └── logo.jpg
│   └── style
│       └── style.css
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE.md
├── NOTICE.md
├── package-lock.json
├── package.json
├── packages.json
├── public
├── README.md
├── SECURITY.md
└── src

```

***

### Сопроводительыне материалы

- gitscm

```bash
$ git init # Инициализация пустого локального репозитория
$ git remote add origin URL_link # Связывание удалённого репозитория с именем "origin" по ссылке "URL_link" с локальным
$ git pull origin name_branch # Ветка из которой мы берем изменения для тестирования
$ git remote show # Показать подключенные удалённые репозитории
$ git status 	# Показывает состояние локального репозитория (отслеживаемые, изменённые, новые файлы и пр.)
$ git add . # Добавить в индекс все новые, изменённые, удалённые файлы из текущей директории и её поддиректорий
$ git commit -S -m"added sources" # Зафиксировать в коммите проиндексированные изменения (закоммитить), добавить сообщение
$ git push origin name_branch # Отправляем изменения из локально репозитория в удалённый в ветку "name_branch"
$ git show HEAD # Информация о последнем комите (git log -1)
$ git clean -fdn # Удаляет неотслеживаемые файлы и каталоги с предворительным просмотром
$ git push --set-upstream origin new-name # Установка upstream (связывает локальную ветку с удаленной)
$ git remote show # Вывод связанных веток
$ git push origin :old-name # Удаление старой ветки в удаленном репо
$ git push origin new-name # Публикация новой ветки
```

- gitscm index

```bash
$ git add text.txt # Добавить в индекс указанный файл (был изменён, был удалён или это новый файл)
$ git add -i # Запустить интерактивную оболочку для добавления в индекс только выбранных файлов
$ git add -p # Показать новые/изменённые файлы по очереди с указанием их изменений и вопросом об отслеживании/индексировании
$ git reset # Убрать из индекса все добавленные в него изменения (в рабочей директории все изменения сохранятся), антипод git add
$ git reset readme.txt # Убрать из индекса изменения указанного файла (в рабочей директории изменения сохранятся)
$ git checkout text.txt # ОПАСНО: отменить изменения в файле, вернуть состояние файла, имеющееся в индексе
$ git reset --hard # ОПАСНО: отменить изменения; вернуть то, что в коммите, на который указывает HEAD (незакомиченные изменения удалены из индекса и из рабочей директории, неотслеживаемые файлы останутся на месте)
$ git clean -df # Удалить неотслеживаемые файлы и директории
```

- gitscm конфликты

```bash

$ git remote set-url origin ssh://git@github.com_gitlab.com/username/newRepoName.git # Замена URL
$ git pull --rebase origin name_branch # Переинициализация
$ git remote -v # Проверка правильности указанного link
$ git reset HEAD~ # Отмена последнего commit$ git reset --hard HEAD~ # Удаление commit с изменениями
$ git push origin --delete name_branch / git branch -rD origin/name_branch
$ git branch -d name_branch # Удаление локального репо
$ git reset HEAD file # Убирает файл из индекса
$ git checkout -- file # Отменяет изменение
$ git clean -fdn # Удаляет неотслеживаемые файлы и каталоги с предварительным просмотром

# Установка новой master/main ветки
$ git branch -m master gpages
$ git fetch origin
$ git branch -u origin/gpages gpages
$ git remote set-head origin -a
```

- gh actions

```bash
$ gh auth login
$ gh repo create repo_name # Cоздание удаленного репозитория (без URL)
$ gh pr create # pull reguest
	 —assignee «nickname» 
	 --base main 
	 --head feature-branch # Индивидуальный pull request (можно -a)
$ gh pr create --title "Bug" --body "work"$ gh pr create --base base_name # head changed_branch$ gh repo create repo_name --source=. --public
$ gh repo clone user/repo
$ gh issue list # Список открытых issue
$ gh pr create --title "Название" --body "Описание" --base main --head feature-branch
	 --title # Заголовок PR
	 --body # Описание
	 --base # Целевая ветка
	 --head # Ваша ветка
$ gh pr merge --squash
$ gh repo view --web # Открыть репозитория в web
```

- gistup

```bash
$ npm install -g gistup
$ gh <command> <subcommand> --help
$ gh gist create -d "my test gist" -f some_local_file.txt  test_gist
```

- .gitignore

```
*build*/
*install*/
*.swp
.idea/
```

- Docke

```bash
$ docker image ls all # все образы
$ docker container ls # все запущенные контейнера
$ docker container ls -all # все контейнера
$ docker run -d --privileged --name docker go:1.16 # привелегированный режим

# Building & Rebuilding
$ docker compose build	 
$ docker compose build --no-cache # Создает образы без использования кэша
$ docker compose build <service> # Создает только определенную службу
$ docker compose up --build	# Создает изображения, а затем запускает контейнеры
$ docker compose up --force-recreate # Воссоздает контейнеры, даже если ничего не изменилось
$ docker compose up --build --force-recreate # Полностью перестраивает и воссоздает контейнеры

# Running Containers
$ docker compose up	
$ docker compose up -d	 # Запускает контейнеры в отсоединенном режиме в фоновом режиме
$ docker compose start	 # Запускает уже созданные контейнеры (не перестраивает и не создает заново)

# Stopping & Removing Containers
$ docker compose stop	
$ docker compose down	# Останавливает и удаляет контейнеры, сети и тома по умолчанию
$ docker compose down --volumes	 # Удаляет контейнеры, сети и именованные/анонимные тома
$ docker compose down --rmi all	 # Также удаляет все построенные изображения
$ docker compose rm	 # Удаляет остановленные контейнеры служб (после остановки)
$ docker compose kill # Принудительно останавливает запуск контейнеров

# Useful Inspection & Debugging
$ docker compose ps	# Списки запущенных служб и их состояние
$ docker compose logs # Отображение журналов для всех служб
$ docker compose logs -f	
$ docker compose exec <service> sh # Открывает оболочку внутри работающего контейнера
$ docker compose config

docker exec -it <container_name_or_id> <command> # выполнение команды
            -i  # интерактивный режим (позволяет передать ввод)
            -t  # выделяет псевдотерминал (tty) для взаимодействия.
            <container_name_or_id>  # имя или ID контейнера.
```

- .dockerignore

```
.git/
monitoring/
node_modules/
screenshots/
test/
build/reports/
dist/
vagrant/
logs/
Dockerfile
.npmrc
/bom.json
/bom.xml
frontend/node_modules/
frontend/dist/
```

***


Copyright (c) 2025 Elijah S Shmakov


![Logo](assets/logotype/logo.jpg)


