
const fs = await import("fs/promises");
const path = await import("path");

await fs.copyFile(path.join('./dist', 'client/login/index.html'), path.join('./dist', 'index.html'))
await fs.cp(path.join('./dist', 'client/assets/entries/'), path.join('./dist', 'assets/entries/'), { recursive: true })


const contents = (await fs.readFile(path.join('./dist', 'index.html'))).toString()

const newContents = contents.replaceAll('Kc_Context_Username', "${(login.username!'')}").replaceAll('Kc_Context_SubmitUrl', '${url.loginAction}')

await fs.rm(path.join('./dist', 'index.html'))

await fs.writeFile(path.join('./dist', 'index.html'), newContents);