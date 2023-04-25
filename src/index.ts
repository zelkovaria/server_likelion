import { input } from "./input";
import { main as postMain } from "./post";
import { changeUserId } from "./post";
//객체 타입을 먼저 선언해줘야함

type Student = {
    id: number;
    name: string;
    email: string;
    pwd: string;
};

type StudentInput = Omit<Student, "id">; // Sutdent에서 id를 직접 지정하지 않고 자동으로 부여하기 위함
//type은 객체의 타입을 나타냄
let students : Student[]=[];
// export let loginedId: number;

// export const getStudents = () => {
//     return students;
//   };

const createStudent = (studentInfo: StudentInput) =>{ //studentInfo는 객체 student를 나타냄

    students.push({
        id: students.length+1,

        // name : stduentInfo.newName,
        ...studentInfo, // ...가 뭔지 체크해두기
    })
}

const checkUser = (email: string, pwd: string) =>{
    const user = students.find((student) => student.email === email && student.pwd === pwd);
    // let nowUser: boolean= true;
    if (user) {
        return user;
    } else {
        // nowUser = false;
        return null;
    }
    // return students;
}


const main = async () => {
    console.log("CLI 버전 인스타그램에 오신 여러분을 환영합니다");
    console.log("로그인을 안 하면 아무것도 못함");

    let option= "";

    do{
        console.log(`
        1. 로그인
        2. 회원가입
        0. 그냥 나가기
        `);
        option = await input("뭐하실?: ");

        switch(option){
           
            case "1":
                const email =await input("이메일: ");
                const pwd =await input("비밀번호: ");
                //console.log(checkUser(email,pwd));
                const isRegistered = checkUser(email,pwd);
                // if (isRegistered){
                //     console.log(`${isRegistered.name}님 하이`);
                // } else{
                //     console.log("해당 이메일을 가진 유저가 없다능");
                // }
                if (isRegistered){
                    console.log(`${isRegistered.name}님 하이`);
                    // loginedId = isRegistered.id;
                    changeUserId(isRegistered.id);
                    await postMain();
                }
                
                break;
            case "2": //회원가입
                const newName =await input("이름: ");
                const newEmail =await input("이메일: ");
                const newPwd =await input("비밀번호: ");
                
                createStudent({name: newName, email: newEmail, pwd: newPwd});
                break;
            case "0":
                break;
            // default:
            //     console.log("Invalid option");
            //     break;
        }
    } while (option !== "0"); // 
};

main();