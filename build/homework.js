//1.Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в возвращаемом объекте с датой когда был вызван метод а также поле info в котором будет записан текст состоящий из названия товара и его цены например: ‘Apple iPhone - $100’;
// Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно вызывать через apply let origResult =  originalFunc.apply(this);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function addItemInfoDecorator(target, method, descriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function () {
        let origResult = originalFunc.apply(this);
        return {
            date: new Date(),
            info: `${this.name} - $${this.price}`
        };
    };
}
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}
__decorate([
    addItemInfoDecorator
], Item.prototype, "getItemInfo", null);
let item = new Item('Nokia', 500);
//2. Создать декоратор класса User. Он должен добавлять в данном классе поле createDate датой создания класса а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’ данную строку нужно передать в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.
function userDecorator(type) {
    return function (targetClass) {
        return class {
            constructor(type) {
                this.createDate = new Date();
                this.type = type;
                console.log(this);
                this.createDate = new Date();
            }
        };
    };
}
let User = class User {
};
User = __decorate([
    userDecorator('admin')
], User);
let user = new User();
//3.Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine. Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.
var apiUsa;
(function (apiUsa) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_usa_url';
        }
        getNews() { } // method
    }
    apiUsa.NewsService = NewsService;
})(apiUsa || (apiUsa = {}));
var apiUa;
(function (apiUa) {
    class NewsService2 {
        constructor() {
            this.apiurl = 'https://news_api_2_url';
        }
        getNews() { } // method get all news
        addToFavorite() { } // method add to favorites
    }
    apiUa.NewsService2 = NewsService2;
})(apiUa || (apiUa = {}));
//4.Есть два класса Junior и Middle создайте класс Senior который будет имплементировать этих два класса а также у него будет еще свой метод createArchitecture реализация данного метода может быть произвольной.
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}
class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}
class Senior {
    doTasks() { }
    ;
    createApp() { }
    ;
    createArchitecture() {
        console.log('Architecture!!!');
    }
}
applyMixin(Senior, [Junior, Middle]);
function applyMixin(targetClass, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}
let senior = new Senior;
