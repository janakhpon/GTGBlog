---
title: 'Django BASE_DIR 설정하기'
date: '2019-11-21'
layout: post
draft: false
path: '/posts/add-django-basedir/'
category: 'Django'
tags:
  - 'Django'
description: '장고에서 랜딩 페이지를 만들 때 경로 설정하기'
---

Django로 웹어플리케이션을 개발할 때, root url('/')로 접속했을 때 보여지는 Landing Page를 어디에 만들어야 하나 고민했다.

그러니까 모든 앱의 베이스가 되는 메인 페이지이기 때문에 특정 앱 내의 templates에 만들기보다는, 프로젝트 단위에서 templates를 만들어야겠다고 생각했다.

mysite라는 프로젝트만 생성하면 디렉토리 구조는 이렇다.

```
mysite
├── mysite
|   ├── __init__.py
|   ├── settings.py
|   ├── urls.py
|   └── wsgi.py
└── manage.py
```

즉 기본적으로 프로젝트만 생성했을 때에는 views.py나 templates를 넣을 곳이 없다.

그러므로

1. `mysite/templates/` 경로를 생성하고 내부에 index.html 파일을 만든다.
2. `mysite/views.py` 를 생성하고 index.html을 렌더하는 index 함수를 만든다.
3. `urls.py`에서 urlpatterns 리스트에 `path('', views.index)`를 추가한다.

이렇게 하고 딱 runserver하면 될 줄 알았더니 `django.template.exceptions.TemplateDoesNotExist: index.html` 템플릿을 찾을 수 없다는 에러가 발생한다.

에러가 나는 이유는 BASE_DIR 설정을 안해줬기 떄문이다.

프로젝트 경로의 templates에서 html파일을 찾을 수 있도록 하려면 `settings.py` 에서 TEMPLATES 내에 `'DIRS': [os.path.join(BASE_DIR, 'mysite', 'templates')],` 를 추가해줘야 한다.

그러면 루트 url로 접속했을 때 index.html 파일이 잘 나타난다.
