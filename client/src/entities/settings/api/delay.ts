"use server"

export const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log("delay done")

    return true;
}