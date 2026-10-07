export const getFirstLatters = (name: string) => {
    const names = name.split(' ');

    return `${names[0][0]}${names[1][0]}`;
}