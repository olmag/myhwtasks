function matchCount(srt, param1, param2) {
    let count = 0;

    for(let i = 0; i < srt.length; i++) {
        if (srt[i] == param1 &&  srt[i + 1] == param2){
            count++;
        }
    }
    return count
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
// робота з стрічками 

console.log('Task 1:', matchCount('ab___ab__', 'a', 'b'));
console.log('Task 1:', matchCount('sdfab__sss__ds', 'a', 'b'));

// Task 2

function indexCount(str, valueA, valueB) {

    // let  paramA = -1;
    // let paramB = -1;

    // for(let i = 0; i < str.length; i++) {
    //     if ((str[i] == valueA) && (str.length > 0)) {
    //         paramA = str.lastIndexOf(valueA)
    //     }
    //     if ((str[i] == valueB) && (str.length > 0)) {
    //         paramB = str.lastIndexOf(valueB)
    //     }
    // }

    // if (paramA != -1) {
    //     if (paramB == -1) {
    //         return paramA;
    //     }
    //     else {
    //         return Math.max(paramA, paramB);
    //     }
    // }

    // if (paramB != -1) {
    //     return paramB;
    // }
    // else {
    //     return -1;
    // }
    
    let a = str.lastIndexOf(valueA);
    let b = str.lastIndexOf(valueB);

    return Math.max(a, b)

}


console.log('Task 2:', indexCount(' ', 'a', 'b'));

//валідація даних, чи є вони і тд 



// Task 3
// In the js_homework/index.js file find transformArray function and implement it according to condition:
// * 1. Length of the returned array have to be 6.
// * 2. Drop id key
// * 3. Normalize data in the objects:
// *   1. Field 'name': have to start with uppercase letter (e.g. CHEVROLET - Chevrolet)
// *   2. Field 'url' string have to start with 'https://'
// *   3. Field 'description' have to be 15 length if more replace it with '...'
// *   4. Field 'data' have to be in 'YYYY/MM/DD HH:MM' format. (e.g. 2021/04/10 19:00)
// *   5. Field 'params' have to be converted into string in next format: '<status>=>progress' (e.g. {status: true, progress: '80'} = 'true=>80'})
// *   6. Add new field 'isVisible' value for it have to be taken from params.status.
// *   7. Function transformArray have to return only elements with isVisible: true.
// 

const dataForFirstTask = [
    {
        url: "desktopwallpapers.org.ua/mini/201507/40069.jpg",
        name: "CHEVROLET",
        id : 1,
        params: {
            status: true,
            progress: "80"
        },
        description : "Be conveyed to users of assistive technologies – such as",
        date : 1422153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40068.jpg",
        name: "DEWOO",
        id : 2,
        params: {
            status: true,
            progress: "88"
        },
        description : "sing color",
        date : 1421153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40067.jpg",
        name: "FOLKSWAGEN",
        id : 3,
        params: {
            status: false,
            progress: "64"
        },
        description : "be conveyed to users of assistive technologies",
        date : 1426153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40057.jpg",
        name: "FERRARI",
        id : 4,
        params: {
            status: true,
            progress: "38"
        },
        description : "ssistive technologies – such as screen readers. Ensure",
        date : 1428153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40066.jpg",
        name: "BMW",
        id : 5,
        params: {
            status: false,
            progress: "12"
        },
        description : "color to add meaning to a button only provides",
        date : 1402153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40064.jpg",
        name: "MERCEDESS",
        id : 6,
        params: {
            status: true,
            progress: "83"
        },
        description : "om the content itself (the visible text of the button)",
        date : 1442153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40063.jpg",
        name: "SKODA",
        id : 7,
        params: {
            status: true,
            progress: "49"
        },
        description : "r is either obvious from the content itself",
        date : 1482153200637
    },{
        url: "desktopwallpapers.org.ua/mini/201507/40062.jpg",
        name: "FORD",
        id : 8,
        params: {
            status: true,
            progress: "14"
        },
        description : "included through alternative means, such as additional text hidden with the",
        date : 1442153200637
    }
];

const transformArray = (data) => {
   
    const newArr = data.slice(0,6);

    newArr.forEach((obj) => {
        delete obj.id;
        obj.name = obj.name.charAt(0) + obj.name.toLowerCase().slice(1);
        obj.url = 'https://' + obj.url;
        obj.description = obj.description.length <= 15 ? obj.description : obj.description.slice(0, 15) + "...";
        obj.date = new Date(obj.date);
        obj.isVisible = obj.params.status;
        obj.params = `${obj.params.status}=>${obj.params.progress}`;
    });
    
    const result = newArr.filter((item) => item.isVisible);


    console.log(result)
};

console.log('Task 3:', transformArray(dataForFirstTask));
