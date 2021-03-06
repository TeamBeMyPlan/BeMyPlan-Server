# Bemyplan-Server  

![Frame 3](https://user-images.githubusercontent.com/81547780/150544152-fe76acf4-c514-4468-90f6-c33d81f50055.png)
![Frame 1](https://user-images.githubusercontent.com/81547780/150544146-4db4b8c8-4e17-4d06-9d5a-ed6d532f3287.png)

> SOPT 29th APPJAM </b>
>
> 프로젝트 기간: 2022.01.02 ~ 2022.01.22

### API DOCS
[be-my-plan-api-docs](https://boggy-snowstorm-fdb.notion.site/ad40d48c650740d8bcc91f9abb8a2f21)

### Development Environment   
<img src="https://img.shields.io/badge/Node.js-v16-green"/> <img src="https://img.shields.io/badge/PostgreSQL-v12.5-blue"/> <img src="https://img.shields.io/badge/Express-v4.17.2-green"/> <img src="https://img.shields.io/badge/Javascript-es6-yellow"/> <img src="https://img.shields.io/badge/firebase-yellow"/>   

### 핵심 기능
![비마플 ia](https://user-images.githubusercontent.com/81547780/150542456-d1386db9-d54f-4c9f-9ba3-72da8b3558ea.jpg)

<details>
<summary>핵심 기능 사진</summary>
<div markdown="1">
      
![과제2](https://user-images.githubusercontent.com/81547780/150545649-0b53dc7a-9051-4672-8e3d-690ee9f392b3.PNG)

![과제사진1](https://user-images.githubusercontent.com/81547780/150545610-a71fc489-aeea-43d0-a29c-8905160cd903.PNG)

</div>
</details>

### Branch Strategy

github flow 사용

![image](https://user-images.githubusercontent.com/81547780/148635082-fa1c8853-b33d-4d9d-9707-8fc5778fe423.png)


| Branch Name | 설명 |
| :---: | :-----: |
| main | 초기 세팅 존재 |
| feature | 새로운 기능 추가 |
| refactor | 리펙터링 관련 |
| fix | 버그 수정 |

### Commit Convention
#### TAG: 메시지 

| 태그 이름  |                             설명                             |
| :--------: | :----------------------------------------------------------: |
|  [CHORE]   |                  코드 수정, 내부 파일 수정                   |
|   [FEAT]   |                       새로운 기능 구현                       |
|   [FIX]    |                       버그, 오류 해결                        |
|   [DOCS]   |                 README나 WIKI 등의 문서 개정                 |
| [REFACTOR] |                   전면 수정이 있을 때 사용                   |

### Coding Convention
[Node-style-guide](https://github.com/felixge/node-style-guide)

[airbnb-javascript-guide](https://github.com/airbnb/javascript)


### ERD
![비마플 ERD](https://user-images.githubusercontent.com/81547780/150499866-478d7819-ab2e-44ce-ac30-c2afab50bfa0.PNG)

### Dependency
```
functions
├── @slack/web-api@6.6.0
├── busboy@1.3.0
├── cookie-parser@1.4.6
├── cors@2.8.5
├── cross-env@7.0.3
├── dayjs@1.10.7
├── dotenv@10.0.0
├── eslint-config-google@0.14.0
├── eslint-config-prettier@8.3.0
├── eslint@7.32.0
├── express@4.17.2
├── firebase-admin@9.12.0
├── firebase-functions-test@0.2.3 
├── firebase-functions@3.16.0
├── firebase@9.6.2
├── helmet@5.0.1
├── hpp@0.2.3
├── jsonwebtoken@8.5.1
├── lodash@4.17.21
├── lru_map@0.3.3 extraneous
├── pg-hstore@2.3.4
├── pg@8.7.1
├── request-promise@4.2.6
├── request@2.88.2
├── @sentry/core@6.16.1 extraneous
├── @sentry/hub@6.16.1 extraneous
├── @sentry/minimal@6.16.1 extraneous
├── @sentry/node@6.16.1 extraneous
├── @sentry/tracing@6.16.1 extraneous
├── @sentry/types@6.16.1 extraneous
├── @sentry/utils@6.16.1 extraneous
└── sequelize@6.13.0
```

### Test
![test](./images/runner-test.png)

### folding project / 프로젝트 폴더링

```
bemyplan_server
|
|- .github
|
|- functions
      |
      |- api
          |- routes
      |- config
      |- constants
      |- contorller
      |- loaders
      |- models
      |- service
      |- lib
      |- db
      |- utils
      |- images
```

### Developers

![비마플 서버 (1)](https://user-images.githubusercontent.com/81547780/150524315-a72795be-e4f6-4c32-b190-ae57f2a5c892.jpg)


|이름|GitHub|
|---|---|
|안준영|[@junyoii](https://github.com/junyoii)|
|이제준|[@LeeJejune](https://github.com/LeeJejune)|
|김보배|[@KimDoubleB](https://github.com/KimDoubleB)|



