'use strict';
const inputFirstDate = document.getElementById("date_person1");
const inputSecondDate = document.getElementById("date_person2");
const btnChart = document.getElementById('createChart');
const compatibilityContainer = document.querySelector('.compatibility-container');
compatibilityContainer.classList.add('display-none');
// if (compatibilityContainer != undefined) compatibilityContainer.hidden = true;

// ставит ограничитель в календаре на даты, которые не наступили
let today = new Date();
document.getElementById('date_person1').setAttribute("max", today.toLocaleDateString("en-CA"));
document.getElementById('date_person2').setAttribute("max", today.toLocaleDateString("en-CA"));

// ставит ограничитель в календаре на даты, которые были раньше 120 лет назад
let ancientDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDay());
document.getElementById('date_person1').setAttribute("min", ancientDate.toLocaleDateString("en-CA"));
document.getElementById('date_person2').setAttribute("min", ancientDate.toLocaleDateString("en-CA"));

let person = {};
let secondPerson = {};
let points = {};
let purposes = {};
let chartHeart = {};
inputFirstDate.value = '';
inputSecondDate.value = '';

function createPerson(per, apoint, bpoint, cpoint) {
    calculatePoints(apoint, bpoint, cpoint);
    per.points = points;
    per.purposes = purposes;
    per.chartHeart = chartHeart;
}

let compatibilityMatrix = [];
// общие значения матрицы
const fillMatrix = (person, secondPerson) => {
    compatibilityMatrix = [
        {
            id: "compatibilityApoint",
            value: reduceNumber(person.points.apoint + secondPerson.points.apoint),
        },
        {
            id: "compatibilityBpoint",
            value: reduceNumber(person.points.bpoint + secondPerson.points.bpoint),
        },
        {
            id: "compatibilityCpoint",
            value: reduceNumber(person.points.cpoint + secondPerson.points.cpoint),
        },
        {
            id: "compatibilityDpoint",
            value: reduceNumber(person.points.dpoint + secondPerson.points.dpoint),
        },
        {
            id: "compatibilityEpoint",
            value: reduceNumber(person.points.epoint + secondPerson.points.epoint),
        },
        {
            id: "compatibilityFpoint",
            value: reduceNumber(person.points.fpoint + secondPerson.points.fpoint),
        },
        {
            id: "compatibilityGpoint",
            value: reduceNumber(person.points.gpoint + secondPerson.points.gpoint),
        },
        {
            id: "compatibilityHpoint",
            value: reduceNumber(person.points.hpoint + secondPerson.points.hpoint),
        },
        {
            id: "compatibilityIpoint",
            value: reduceNumber(person.points.ipoint + secondPerson.points.ipoint),
        },
        {
            id: "compatibilityJpoint",
            value: reduceNumber(person.points.jpoint + secondPerson.points.jpoint),
        },
        {
            id: "compatibilityNpoint",
            value: reduceNumber(person.points.npoint + secondPerson.points.npoint),
        },
        {
            id: "compatibilityLpoint",
            value: reduceNumber(person.points.lpoint + secondPerson.points.lpoint),
        },
        {
            id: "compatibilityKpoint",
            value: reduceNumber(person.points.kpoint + secondPerson.points.kpoint),
        },
        {
            id: "compatibilityMpoint",
            value: reduceNumber(person.points.mpoint + secondPerson.points.mpoint),
        },
        {
            id: "compatibilitySpoint",
            value: reduceNumber(person.points.spoint + secondPerson.points.spoint),
        },
        {
            id: "compatibilityOpoint",
            value: reduceNumber(person.points.opoint + secondPerson.points.opoint),
        },
        {
            id: "compatibilityTpoint",
            value: reduceNumber(person.points.tpoint + secondPerson.points.tpoint),
        },
        {
            id: "compatibilityPpoint",
            value: reduceNumber(person.points.ppoint + secondPerson.points.ppoint),
        },
        {
            id: "compatibilityQpoint",
            value: reduceNumber(person.points.qpoint + secondPerson.points.qpoint),
        },
        {
            id: "compatibilityRpoint",
            value: reduceNumber(person.points.rpoint + secondPerson.points.rpoint),
        },
        {
            id: "compatibilityVpoint",
            value: reduceNumber(person.points.vpoint + secondPerson.points.vpoint),
        },
        {
            id: "compatibilityUpoint",
            value: reduceNumber(person.points.upoint + secondPerson.points.upoint),
        },
        {
            id: "compatibilityWpoint",
            value: reduceNumber(person.points.wpoint + secondPerson.points.wpoint),
        },
        {
            id: "compatibilityXpoint",
            value: reduceNumber(person.points.xpoint + secondPerson.points.xpoint),
        },
        {
            id: "compatibilityF2point",
            value: reduceNumber(person.points.f2point + secondPerson.points.f2point),
        },
        {
            id: "compatibilityF1point",
            value: reduceNumber(person.points.f1point + secondPerson.points.f1point),
        },
        {
            id: "compatibilityG2point",
            value: reduceNumber(person.points.g2point + secondPerson.points.g2point),
        },
        {
            id: "compatibilityG1point",
            value: reduceNumber(person.points.g1point + secondPerson.points.g1point),
        },
        {
            id: "compatibilityI2point",
            value: reduceNumber(person.points.i2point + secondPerson.points.i2point),
        },
        {
            id: "compatibilityI1point",
            value: reduceNumber(person.points.i1point + secondPerson.points.i1point),
        },
        {
            id: "compatibilityH2point",
            value: reduceNumber(person.points.h2point + secondPerson.points.h2point),
        },
        {
            id: "compatibilityH1point",
            value: reduceNumber(person.points.h1point + secondPerson.points.h1point),
        },
    ];
}

// функция, которая ищет одинаковые айдишники в матрице и массиве, и выводит значения
function outputCompatibilityMatrixValues() {
    const elements = document.querySelectorAll('[id^="compatibility"]');
    compatibilityMatrix.forEach((matrixItem) => {
        elements.forEach((el) => {
            if (el.id === matrixItem.id) {
                el.innerHTML = matrixItem.value;
            }
        });
    });
}

// кнопка для рассчёта совместимости
btnChart.addEventListener('click', (evt) => {
    evt.preventDefault();
    const date1 = new Date(document.getElementById('date_person1').value);
    const date2 = new Date(document.getElementById('date_person2').value);
    const wrongDate = document.querySelector('.wrongDate');
    const output2 = document.querySelector('.output2');
    const response = valideDates(date1, date2);

    output2.innerHTML = '';
    wrongDate.innerHTML = '';

    if (response !== true) {
        output2.innerHTML = '';
        wrongDate.innerHTML = response;
    } else {
        output2.innerHTML = date1.toLocaleDateString("ru") + ' ' + '+' + ' ' + date2.toLocaleDateString("ru");
        // создаем два объекта со значениями
        let apoint = date1.getDate(); // day of birth
        let bpoint = date1.getMonth(); // month of birth
        let year = date1.getFullYear(); //year of birth
        let cpoint = calculateYear(year); // c - year of bir
        createPerson(person, apoint, bpoint, cpoint);

        let secondApoint = date2.getDate(); // day of birth
        let secondBpoint = date2.getMonth(); // month of birth
        let year2 = date2.getFullYear(); //year of birth
        let secondCpoint = calculateYear(year2); // c - year of bir
        createPerson(person, apoint, bpoint, cpoint);
        createPerson(secondPerson, secondApoint, secondBpoint, secondCpoint);
        fillMatrix(person, secondPerson);
        // compatibilityContainer.hidden = false;
        compatibilityContainer.classList.remove('display-none');
        outputCompatibilityMatrixValues();
        clearInputs(inputFirstDate, inputSecondDate);
    }
});

function valideDates(date1, date2) {
    let errorMessage = '';

    if (date1 > today || date2 > today) {
        errorMessage += `<p>Dates can't be in the future.</p>`;
    }

    if (today.getFullYear() - date1.getFullYear() > 120 || today.getFullYear() - date2.getFullYear() > 120) {
        errorMessage += `<p>Dates can't be so far in the past.</p>`;
    }

    //ограничение на разницу в возрасте не больше 70 лет
    const ageDifference = Math.abs(date1.getFullYear() - date2.getFullYear());

    if (ageDifference >= 71) {
        errorMessage = `<p>The age difference is too big.</p>`;
    }

    if (isNaN(date1.getFullYear()) === true || isNaN(date2.getFullYear()) === true) {
        errorMessage += `<p>Date is not valid or one of the fields is empty.</p>`;
    }

    if (errorMessage !== '') return errorMessage;

    return true;
}