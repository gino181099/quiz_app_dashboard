import { Inter } from "next/font/google";
import { HomeComponent } from "../components/home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center align-center justify-between p-24 ${inter.className}`}
    >
      <HomeComponent />
    </main>
  );
}
