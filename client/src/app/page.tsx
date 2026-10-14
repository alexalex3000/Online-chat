import SearchQuestion from "@/features/SearchQuestion/SearchQuestion";
import {Suspense} from "react";

export default function Home() {
    return (
        <div>
            <Suspense fallback={null}>
                <SearchQuestion/>
            </Suspense>
        </div>
    )
}