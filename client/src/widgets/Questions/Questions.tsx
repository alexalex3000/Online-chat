"use client"

import HelpSelect from "@/shared/ui/HelpSelect/HelpSelect";
import Label from "@/shared/ui/Label/Label";
import {useSearchParams} from "next/navigation";
import {FAQItem} from "@/entities/question/model/types";

const helpQuestionsRaw: FAQItem[] = [
    {
        question: "How do I update my profile details?",
        answer: "Go to Settings → Profile. From there, you can change your display name, username, bio, and upload a new profile picture."
    },
    {
        question: "How can I reset my password?",
        answer: "On the sign-in screen, click \"Forgot Password?\", enter your registered email or phone number, and follow the verification instructions sent to you."
    },
    {
        question: "Can I change my registered email address?",
        answer: "Yes, navigate to Settings → Security → Email Address, enter your new email, and verify it with the security code."
    },
    {
        question: "Can I edit or delete sent messages?",
        answer: "Yes. Right-click the message (or long-press on mobile) and select either \"Edit\" or \"Delete\". When deleting, you can choose to remove it just for yourself or for everyone."
    },
    {
        question: "What is the maximum file size for attachments?",
        answer: "The standard file upload limit is 100 MB per file. Most standard formats for images, videos, audio, and documents are supported."
    },
    {
        question: "What do the message checkmarks mean?",
        answer: "One checkmark means the message was sent to the server. Two checkmarks mean it was delivered to the recipient's device. Two blue (or colored) checkmarks indicate the message has been read."
    },
    {
        question: "Who can see my online status and last seen?",
        answer: "By default, all contacts can see your status. You can customize this anytime under Profile → Privacy."
    },
    {
        question: "How do I block an unwanted user?",
        answer: "Open the user's profile or click the menu (three dots) in the top-right corner of the chat and select \"Block User\"."
    },
    {
        question: "How do I switch the color theme?",
        answer: "Open Settings → Appearance (or Interface) and select your preferred style: Classic Dark, Gray or Light."
    },
    {
        question: "Why am I not receiving notifications?",
        answer: "Ensure notifications are enabled both in your browser/device system settings and inside the app's Notification settings. Also check that \"Do Not Disturb\" is turned off."
    }
];


export default function Questions() {
    const searchParams = useSearchParams();

    const searchValue = searchParams.get("search");
    const helpQuestions = helpQuestionsRaw.filter(question => question.question.trim().toLowerCase().includes(searchValue?.trim().toLowerCase() ?? ""));

    return (
        <div>
            <Label label={"Frequently Asked Questions"}/>
            <div>
                {
                    helpQuestions.map((questionObj, index) => {
                        if (index === 0) {
                            return (
                                <HelpSelect
                                    question={questionObj.question}
                                    answer={questionObj.answer}
                                    className={"!rounded-none !rounded-t-2xl"}/>
                            )
                        }

                        if (index === helpQuestions.length - 1) {
                            return (
                                <HelpSelect
                                    question={questionObj.question}
                                    answer={questionObj.answer}
                                    className={"!rounded-none !rounded-b-2xl"}/>
                            )
                        }

                        return (
                            <HelpSelect
                                question={questionObj.question}
                                answer={questionObj.answer}
                                className={"!rounded-none"}/>
                        )
                    })
                }
            </div>
        </div>
    )
}