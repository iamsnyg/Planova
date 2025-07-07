"use client";
import ParticleBackground from "@/components/ParticleBackground";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/feature";
import { ArrowRight, ChevronRight } from "lucide-react";
// import { Link } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faq from "@/data/faq.json"; // Assuming you have a JSON file for FAQs

export default function Home() {
    return (
        <div className="min-h-screen">
            <section className="container mx-auto py-20 text-center">
                <div className="">
                    <h1 className="font-permanent-marker text-6xl sm:text-7xl  font-extrabold gradient-title text-emerald-500  pb-6 flex flex-col">
                        No more chaos — just streamlined collaboration with
                        <br />
                        <span className="flex mx-auto -mt-24  text-center">
                            <Image
                                src="/planova.png"
                                alt="Planova Logo"
                                width={200}
                                height={80}
                                className=" w-auto object-contain items-center"
                            />
                        </span>
                    </h1>
                </div>
                <p className="text-xl sm:text-2xl text-white -mt-16 mb-8">
                    Your all-in-one project management solution for seamless
                    teamwork and productivity.
                </p>
                <div className="flex flex-row justify-center items-center gap-4 mt-8">
                    <Link href={"/onboarding"}>
                        <Button variant={"planovaBtn"} className="">
                            Get Started
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={"/onboarding"}>
                        <Button className="border-2 border-emerald-400 hover:border-black bg-transparent text-emerald-400 hover:bg-emerald-300/20 hover:text-black">
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                {/* <ParticleBackground /> */}
            </section>

            <section id="features" className="bg-gray-900 text-white py-20">
                <div className="container mx-auto">
                    <h3 className="gradient-title text-3xl sm:text-4xl font-extrabold text-center">
                        Key Features
                    </h3>
                    <div className="flex flex-row flex-1/4 justify-center items-center gap-4 mt-8">
                        {features.map((feature, index) => {
                            return (
                                <Card
                                    key={index}
                                    className="bg-gray-800 hover:border-y-4 border-emerald-500 text-white hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-lg p-6 w-full sm:w-1/4"
                                >
                                    <CardContent className="flex flex-col items-center text-center">
                                        <feature.icon className="h-6 w-6 text-emerald-500 mb-2" />
                                        <h4 className="font-semibold text-lg text-emerald-400">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-foreground select-none">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-2 border-white/30 b bg-gray-200/10 rounded-3xl m-5  text-white py-20">
                <div className="container mx-auto">
                    <h3 className="gradient-title text-3xl sm:text-4xl font-extrabold">Frequently Asked Questions</h3>
                    <div className="">
                        <Accordion type="single" collapsible>
                            {faq.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-lg font-semibold " >
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-gray-300">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            <section className="bg-background-spin">
                <div className="container mx-auto py-20 text-center">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold gradient-title mb-4">
                            Ready to Transform Your Project Management?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8">
                            Join the thousands of teams already using Planova to streamline their workflows and boost productivity.
                        </p>
                        <Link href={"/onboarding"}>
                            <Button variant={"planovaBtn"} className="flex items-center gap-2">
                                Get Started
                                <ChevronRight className="h-4 w-4" />    
                            </Button> 
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
