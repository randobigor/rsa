window.onload = function () {
    var goButton = document.querySelector('#goButton');
    goButton.addEventListener('click', function () {
        var pNumber = document.querySelector('#pNumber')['value'];
        var qNumber = document.querySelector('#qNumber')['value'];
        var cryptWord = document.querySelector('#cryptWord')['value'];
        new Crypting(pNumber, qNumber, cryptWord);
    });
};
var Crypting = /** @class */ (function () {
    function Crypting(p, q, word) {
        this.letters = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        this.cryptedLetters = [];
        this.cryptedText = '';
        this.encryptedText = '';
        this.p = p;
        this.q = q;
        this.word = word;
        this.calculating();
    }
    Crypting.prototype.calculating = function () {
        this.n = this.p * this.q;
        this.m = (this.p - 1) * (this.q - 1);
        this.findD();
        this.findE();
        this.cryptLetters();
        this.cryptWord();
        this.encryptWord();
    };
    Crypting.prototype.findD = function () {
        var dels = [];
        for (var i = 2; i < this.m; i++) {
            dels.push(this.gcd(i, 20));
        }
        for (var i = 2; i < this.m; i++) {
            if (this.isPrime(i) && !dels.includes(i)) {
                this.d = i;
                break;
            }
        }
    };
    Crypting.prototype.findE = function () {
        this.e = 1;
        while (true) {
            if ((this.e * this.d) % (this.m) == 1) {
                break;
            }
            else {
                this.e++;
            }
        }
    };
    Crypting.prototype.gcd = function (a, b) {
        if (b) {
            return this.gcd(b, a % b);
        }
        else {
            return Math.abs(a);
        }
    };
    Crypting.prototype.isPrime = function (n) {
        var k = 0;
        for (var i = 1; i <= n; i++) {
            if (n % i == 0)
                k++;
        }
        if (k == 2)
            return true;
    };
    Crypting.prototype.cryptLetters = function () {
        var letterNumber;
        for (var i = 0; i < this.word.length; i++) {
            letterNumber = this.letters.indexOf(this.word[i]) + 1;
            this.cryptedLetters.push(Math.pow(letterNumber, this.e) % 33);
        }
        console.log('Crypted numbers: ' + this.cryptedLetters);
    };
    Crypting.prototype.cryptWord = function () {
        var letterNumber;
        for (var i = 0; i < this.cryptedLetters.length; i++) {
            this.cryptedText += this.letters[this.cryptedLetters[i] - 1];
        }
        console.log('Crypted Text: ' + this.cryptedText);
    };
    Crypting.prototype.encryptWord = function () {
        var letterNumber;
        for (var i = 0; i < this.cryptedLetters.length; i++) {
            letterNumber = Math.pow(this.cryptedLetters[i], this.d) % 33;
            this.encryptedText += this.letters[letterNumber - 1];
        }
        console.log('Encrypted Text: ' + this.encryptedText);
    };
    Crypting.prototype.showNumbers = function () {
        console.log('-------');
        console.log('P: ' + this.p);
        console.log('Q: ' + this.q);
        console.log('N: ' + this.n);
        console.log('M: ' + this.m);
        console.log('D: ' + this.d);
        console.log('E: ' + this.e);
        console.log('-------');
    };
    return Crypting;
}());
