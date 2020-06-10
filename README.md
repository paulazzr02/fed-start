# FED-starter

## GIT
### Branches
항상 유지되는 메인 브랜치들 : master, develop, 일정기간동안만 유지되는 브랜치들 : feature, release
  - master : 최종 브랜치
  - develop : 개발 브랜치
  - feature : 기능 개발 브랜치

## Installation
Using npm:

### Prerequisites
  - Node.js 12.13.0 LTS


## Install Node, Gulp
1. Install [Node«](https://nodejs.org/)
```
- NVM 으로 NodeJS 설치 시
(MacOS) https://github.com/nvm-sh/nvm 참고
(WinOs) https://github.com/coreybutler/nvm-windows 참고

- NVM Helps
$ `nvm ls-remote`  # 사용 가능한 Node Version List
$ `nvm install <viesion>` # 특정 버젼의 Node 설치
$ `nvm install --lts` # 또는 LTS Version 으로 설치
$ `nvm use <version>` # 사용할 Node 버전 설정
$ `nvm install <version> --reinstall-packages-from-<version>` # Update Node Version
```

2. Install [Gulp](https://github.com/gulpjs/gulp)
```
$ npm install gulp-cli -g
```


## Usage

### MacOS
```
# STEP 1 : FED 루트 디렉토리로 이동
$ cd FED_ROOT

# STEP 2 : node_modules 의존성 패키지 설치 (package.json 이 있는 디렉토리)
$ npm install

# STEP 3 : (Default)개발모드
$ npm run start

# STEP 3 : 배포모드
$ npm run build
```


### WinOs
 - MacOS 명령어 참고
 - 윈도 환경에서 테스트가 미흡합니다.
 - 설치 중 문제가 생기면 FED 팀에 문의바랍니다.


## Features include
  - Live reload in development
  - ES6+ transpilation (by Babel)
  - Sass compilation (autoprefixing)
  - ES Modules (by Webpack)
  - CSS, JS, image files, Minification in production
  - Shrinks image files
  - Convert svg file to webfont
