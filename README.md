# Bemyplan-Server  
### 내 취향에 맞는 여행 서비스, Be My Plan


> SOPT 29th APPJAM </b>
>
> 프로젝트 기간: 2022.01.02 ~ 2022.01.22

### API DOCS
[be-my-plan-api-docs](https://wood-sandpaper-707.notion.site/API-bca655150dce4eb8bed070a4cad8c3df)

<details>
      <summary><i>API 구현 진척도</i></summary>
      <div markdown="1">
            인기/최신/추천 여행일정 조회 => 완료!</br>
      현재 <b>여행지 선택 조회, 여행지 여행일정 조회</b> 진행중
      </div>
</details>

### ERD
![image](https://user-images.githubusercontent.com/81547780/148912777-6f990228-f369-47e5-905a-d0064bdaabd7.png)

### Development Environment   
<img src="https://img.shields.io/badge/Node.js-v16-green"/> <img src="https://img.shields.io/badge/PostgreSQL-v12.5-blue"/> <img src="https://img.shields.io/badge/Express-v4.17.2-green"/> <img src="https://img.shields.io/badge/Javascript-es6-yellow"/> <img src="https://img.shields.io/badge/firebase-yellow"/>   

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
      |- lib
      |- db
```

### Developers

|이름|GitHub|
|---|---|
|안준영|[@junyoii](https://github.com/junyoii)|
|이제준|[@LeeJejune](https://github.com/LeeJejune)|
|김보배|[@KimDoubleB](https://github.com/KimDoubleB)|



