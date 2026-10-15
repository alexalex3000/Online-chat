"use client"

import Link from "next/link";
import styles from "./rules.module.scss";
import {MoveLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function RulesPage() {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        setIsMobile(false);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <div className={styles.wrap}>
            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Community Rules</h1>
                    <p className={styles.subtitle}>Last updated: October 15, 2026</p>
                </header>

                <nav className={styles.nav}>
                    <ol className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="#general" className={styles.link}>
                                1. General Provisions
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#prohibited" className={styles.link}>
                                2. Prohibited Content
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#communication" className={styles.link}>
                                3. Communication Standards
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#sanctions" className={styles.link}>
                                4. Moderation & Sanctions
                            </Link>
                        </li>
                    </ol>
                </nav>

                <div className={styles.content}>
                    <section id="general">
                        <h2>1. General Provisions</h2>
                        <p>
                            These guidelines govern user interactions across our platform and
                            community channels. By accessing and using this service, you agree to
                            comply with all stated rules.
                        </p>
                        <p>
                            The administration reserves the right to amend these terms at any
                            time without prior notice.
                        </p>
                    </section>

                    <section id="prohibited">
                        <h2>2. Prohibited Content</h2>
                        <p>The following activities and content types are strictly prohibited:</p>
                        <ul>
                            <li>Distributing spam, unsolicited advertising, or referral links.</li>
                            <li>Sharing malicious software, phishing websites, or exploits.</li>
                            <li>Posting material that violates copyright or applicable laws.</li>
                            <li>Publishing private personal data of others without explicit consent (doxxing).</li>
                        </ul>
                    </section>

                    <section id="communication">
                        <h2>3. Communication Standards</h2>
                        <p>
                            We strive to foster a safe and welcoming space. Please follow these basic
                            principles:
                        </p>
                        <ul>
                            <li>
                                Treat fellow members with respect. Harassment, insults, and personal
                                attacks are not tolerated.
                            </li>
                            <li>Avoid message flooding and unnecessary excessive capitalization.</li>
                            <li>Keep conversations relevant to the designated topics and channels.</li>
                        </ul>
                    </section>

                    <section id="sanctions">
                        <h2>4. Moderation & Sanctions</h2>
                        <p>
                            Violations will lead to disciplinary actions evaluated by the
                            moderation team according to the severity of the offense:
                        </p>
                        <ol>
                            <li>Official warning.</li>
                            <li>Temporary mute (read-only mode).</li>
                            <li>Permanent account suspension or channel ban.</li>
                        </ol>
                    </section>
                </div>

                <footer className={styles.footer}>
                    <p>
                        For inquiries or appeals regarding moderation decisions, contact support:{" "}
                        <a href="mailto:support@example.com" className={styles.link}>
                            support@example.com
                        </a>
                    </p>
                </footer>
            </main>
            {
                !isMobile && (
                    <div
                        onClick={() => {
                            router.replace("/chat")
                        }}
                        className={styles.goBack}>
                        <MoveLeft/>
                    </div>
                )
            }
        </div>
    );
}