import * as db from "./db";
import { Command } from "commander";

// const main = async () => {
//     // let p = await db.addPost("Test", "Admin", "Corpo del testo", false);
//     // console.log(p);

//     await db.updatePost("664b86fbd9d18f38d7a901b9", undefined, "Gigi", undefined, undefined);
//     console.log(await db.getPosts());
// }

// main();
const program = new Command();

program
    .name("Gestione Posts")
    .description("Un programma per gestire posts su MongoDB")
    .version("1.0.0");

const postsCommand = program
    .command("posts")
    .description("Ritorna tutti i posts")
    .action(async () => {
        console.log(await db.getPosts());
    });

postsCommand.command("add")
    .description("Aggiunge un post")
    .option('-t, --title <title>', 'titolo del post')
    .option('-b, --body <body>', 'corpo del post')
    .option('-a, --author <author>', 'autore del post')
    .option('-d, --hidden <hidden>', 'visibilità del post', true)
    .action(async opts => {
        console.log(opts);
        let post = await db.addPost(opts.title, opts.body, opts.author, opts.hidden);
        console.log("Post inserito con successo");
    });

postsCommand.command("delete")
    .description("Rimuove un post")
    .argument('id', 'id del post')
    .action(async id => {
        let post = await db.deletePost(id);
        console.log(post);
    });

postsCommand.command("update")
    .description("Aggiorna un post")
    .argument('id', 'id del post')
    .option('-t, --title <title>', 'titolo del post')
    .option('-b, --body <body>', 'corpo del post')
    .option('-a, --author <author>', 'autore del post')
    .option('-d, --hidden <hidden>', 'visibilità del post')
    .action(async (id, opts) => {
        let post = await db.updatePost(id, opts.title, opts.body, opts.author, opts.hidden);
        console.log(post);
    });

program.parse();
