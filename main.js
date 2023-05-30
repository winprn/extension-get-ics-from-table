const myICS = ics();

const getCourses = () => {
    const classes = document.querySelectorAll('td[data-bind="text: TenMH"]');
    const courses = [];

    for (let i = 0; i < classes.length; i++) {
        const theoryCourse = {};
        theoryCourse.name = `[LT] ${classes[i].innerText}`;
        let theoryClass = classes[i];
        for (let j = 0; j < 7; j++) theoryClass = theoryClass.nextElementSibling;
        theoryCourse.date = theoryClass.innerText.split(' ');
        courses.push(theoryCourse);
        const labClass = theoryClass.nextElementSibling;
        if (labClass.innerText !== '') {
            const labCourse = {};
            labCourse.name = `[TH] ${classes[i].innerText}`;
            labCourse.date = labClass.innerText.split(' ');
            labCourse.isLab = true;
            courses.push(labCourse);
        }
    }

    return courses;
}

const updateData = (courses) => {
    courses.map((course, index) => {
        const date = course.date[0];
        const startTime = course.date[1].split('-')[0].split(':');
        const endTime = course.date[1].split('-')[1].split(':');
        const location = course.date[2].replace('(', '').replace(')', '');
        const d = new Date();
        d.setDate(d.getDate() + (1 - d.getDay() + 7) % 7 + Number(date[1]) - 2);
        if (course.isLab) d.setDate(d.getDate() + 7);
        d.setHours(startTime[0], startTime[1], 0);
        const d2 = new Date(d);
        d2.setHours(endTime[0], endTime[1], 0);
        console.log(course.name, d, d2, startTime[0], startTime[1], endTime[0], endTime[1], location);
        myICS.addEvent(course.name, '', location, d, d2, {
            freq: 'WEEKLY',
        });
    })
}

const downLoadData = () => {
    const courses = getCourses();
    updateData(courses);
    console.log(myICS.events());
    myICS.download('TKB');
}