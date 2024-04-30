import { RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { database } from "../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function HomeComponent({ className }) {
  const functionsDoc = doc(database, "functions", "all");
  const [w1name, setW1name] = useState("");
  const [w1points, setW1points] = useState(0);
  const [w2name, setW2name] = useState("");
  const [w2points, setW2points] = useState(0);

  const questionCollection1 = query(
    collection(database, "users"),
    orderBy("firstPoints", "desc"),
    limit(1)
  );
  const questionCollection2 = query(
    collection(database, "users"),
    orderBy("secondPoints", "desc"),
    limit(1)
  );

  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    getDoc(functionsDoc).then(
      (doc) => (
        doc.data().firstAllow == true ? setFirst(true) : setFirst(false),
        doc.data().secondAllow == true ? setSecond(true) : setSecond(false)
      )
    );
    onSnapshot(questionCollection1, (data) =>
      data.docs.map(
        (doc) => (
          setW1name(doc.data().name), setW1points(doc.data().firstPoints)
        )
      )
    );
    onSnapshot(questionCollection2, (data) =>
      data.docs.map(
        (doc) => (
          setW2name(doc.data().name), setW2points(doc.data().secondPoints)
        )
      )
    );
  }, []);

  const updateDoc1 = () => (
    setFirst((prevState) => !prevState),
    setDoc(functionsDoc, { firstAllow: !first }, { merge: true })
  );
  const updateDoc2 = () => (
    setSecond((prevState) => !prevState),
    setDoc(functionsDoc, { secondAllow: !second }, { merge: true })
  );

  return (
    <>
      <Card className={cn("w-[380px] adapt an", className)}>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Panel central para administrar el quiz
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4 switchContainer items-start justify-start">
          <div className="flex items-center space-x-2 switchContainer">
            <Switch id="airplane-mode" onClick={updateDoc1} checked={first} />
            <Label htmlFor="airplane-mode">Quiz 1</Label>
          </div>
          <Button className="w-full an2">Mostrar al ganador del quiz</Button>
          {/* <div className="flex items-center space-x-4 mt-4 switchContainer">
          <Switch id="airplane-mode" onClick={updateDoc2} checked={second} />
          <Label htmlFor="airplane-mode">Quiz 2</Label>
        </div>
        <Button className="w-full an2">Mostrar al ganador del quiz 2</Button> */}

          {/* <p>
          El ganador del quiz 2 es {w2name} con {w2points} puntos
        </p> */}
        </CardFooter>
      </Card>
      <Card className="winnerContainer">
        <p className="winner">{w1name}</p>
        <p>{w1points}/20</p>
      </Card>
    </>
  );
}
