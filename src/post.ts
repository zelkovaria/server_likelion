import { input } from "./input";
// import { loginedId} from "./index";


//객체 타입을 먼저 선언해줘야함
type userPost = {
    id: number;
    writerId: number;
    content: string;
    createdAt: Date;
};

// let loggedInUserId:number = loginedId;

let loggedInUserId:number | null =null;

export const changeUserId = (id:number) =>{
    loggedInUserId = id ;
};

type PostsInput = Omit<userPost, "id">;

// Sutdent에서 id를 직접 지정하지 않고 자동으로 부여하기 위함
let posts : userPost[]=[];

const createPosts = (postsInfo: PostsInput) =>{
    posts.push({
        id: posts.length+1,
        ...postsInfo,
    })
}



const getAllPosts = () =>{
    return posts;
}

const deletePosts = (id:number) => { //id만 받아서 지우려고함
    const postIndex = posts.findIndex((post) => post.id === id);
    if(postIndex === -1) {
        return; //해당되는 id찾아서 지우기
    }
    console.log(posts[postIndex].writerId);
    console.log(loggedInUserId);
    // posts.splice(postIndex, 1); // 그 index부터 1개를 없애기 위함
    if(posts[postIndex].writerId === loggedInUserId) {
        posts.splice(postIndex, 1);
    } else {
        console.log("님 게시물이 아닌데요");
    }

};

export const main = async () => {
    console.log("Welcome to student management system!");
    console.log(`
    1. 피드 보기
    2. 게시물 작성
    3. 게시물 삭제
    0. 로그아웃
    `);

    let option= "";

    do{
        option = await input("Select an option: ");
 
        switch(option){ //피드 보기
            case "1":
                console.log("피드 보기");
                console.log(getAllPosts());
                break;
            case "2":  //게시물 작성  
                console.log("게시물 작성");
                const text =await input("내용: ");
                createPosts({writerId: 1, content: text, createdAt: new Date()});
                console.log("게시물 작성 완완");
                break;
             case "3": // 게시물 삭제
                console.log("게시물 삭제");
                const idForDelete = parseInt(await input("삭제할 게시물의 id: "));
                deletePosts(idForDelete);
                //deletePosts(idForDelete, loginID);
                break;
            case "0": //로그아웃
                console.log("로그아웃");
                // router.push('/login');
                break;
            default:
                console.log("Invalid option");
                break;
        }
    } while (option !== "0"); // 
};

// main();