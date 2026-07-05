"use client";

import { useState } from "react";

import {

    analyzeSymptoms,

    SymptomAnalysis

} from "@/services/api";
import Link from "next/link";
import { ArrowRight, Bot, MessageCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


export default function SymptomsPage() {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

const [result, setResult] = useState<SymptomAnalysis | null>(null);
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Symptom checker</p>
            <h1 className="mt-2 text-3xl font-semibold">Ask about how you’re feeling</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Conversational triage</CardTitle>
              <CardDescription>Describe symptoms and the AI will summarize next steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2 text-emerald-600"><Bot className="h-4 w-4" /> HealthBrain AI</div>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">I can help interpret symptoms, severity, and the appropriate next step. Please tell me what you’re feeling today.</p>
              </div>
              <div className="flex gap-3">
                <Input placeholder="e.g. fatigue, fever, mild chest tightness" value={message} onChange={(event) => setMessage(event.target.value)} />
                <Button

                disabled={loading}

                onClick={async()=>{

                    if(!message.trim()) return;

                    setLoading(true);

                    try{

                        const res=

                        await analyzeSymptoms(message);

                        setResult(res);

                    }

                    finally{

                        setLoading(false);

                    }

                }}

                >

                <MessageCircle className="mr-2 h-4 w-4"/>

                {

                loading

                ?

                "Thinking..."

                :

                "Ask"

                }

</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Assessment overview</CardTitle>
              <CardDescription>Structured summary for rapid review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {

              result &&

              <>

              <div className="rounded-2xl border p-4">

              <p className="text-sm text-zinc-500">

              Possible Conditions

              </p>

              <div className="mt-2 flex flex-wrap gap-2">

              {

              result.possible_conditions.map(

              (item)=>(

              <Badge key={item}>

              {item}

              </Badge>

              )

              )

              }

              </div>

              </div>

              <div className="rounded-2xl border p-4">

              <p className="text-sm text-zinc-500">

              Severity

              </p>

              <p className="font-semibold">

              {result.severity}

              </p>

              </div>

              <div className="rounded-2xl border p-4">

              <p className="text-sm text-zinc-500">

              Specialist

              </p>

              <p className="font-semibold">

              {

              result.recommended_specialist

              }

              </p>

              </div>

              </>

}
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-zinc-100">
                  <Stethoscope className="h-4 w-4 text-blue-600" /> AI explanation
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{result?.recommendation || "Describe your symptoms for an AI-powered assessment."}</p>
                <div className="mt-4 flex items-center gap-2">
                  {result && (
                  <>
                    <Badge>
                      {result.emergency ? "Emergency" : "Non Emergency"}
                    </Badge>
                    <Badge variant="secondary">
                      {result.severity}
                    </Badge>
                  </>
                )}
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/doctors">
                  Find a specialist <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
