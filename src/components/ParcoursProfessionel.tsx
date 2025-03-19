import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Timeline = () => {
    const t = useTranslations("ParcoursProfessionel");
    const experiences = t.raw("experiences") as Array<{
        id: number;
        period: string;
        title: string;
        company: string;
        type: string;
        tasks: string[];
    }>;

    return (
        <section className="container mx-auto px-4 py-16">
            <motion.h2
                className="text-3xl font-bold mb-10 text-center"
                style={{ color: "#6f2dff" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                {t("title")}
            </motion.h2>

            <div className="relative">
                {/* Timeline bar with animation */}
                <motion.div
                    className="absolute left-6 md:left-1/2 w-1 transform -translate-x-1/2"
                    style={{ backgroundColor: "#6f2dff", originY: 0 }}
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        className={`flex flex-col md:flex-row mb-14 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
                    >
                        {/* Timeline circle with pop effect */}
                        <motion.div
                            className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 border-4 border-background z-10"
                            style={{ backgroundColor: "#6f2dff" }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3 + index * 0.2,
                                type: "spring",
                                stiffness: 300
                            }}
                        />

                        {/* Content with card animation */}
                        <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-8 ml-2 md:ml-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                            >
                                <Card className="border shadow-md hover:shadow-lg transition-all duration-300" style={{ borderColor: "#6f2dff33" }}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                            <h3 className="text-xl font-bold" style={{ color: "#6f2dff" }}>{exp.title}</h3>
                                            <Badge variant="outline" className="h-fit whitespace-nowrap"
                                                style={{ backgroundColor: "#6f2dff15", color: "#6f2dff", borderColor: "#6f2dff33" }}>
                                                {exp.period}
                                            </Badge>
                                        </div>
                                        <div className="mb-3">
                                            <span className="text-lg font-semibold">{exp.company}</span>
                                            <p className="text-muted-foreground italic">{exp.type}</p>
                                        </div>
                                        <ul className="list-disc pl-5 space-y-1.5 text-foreground/80">
                                            {exp.tasks.map((task, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.6 + index * 0.2 + idx * 0.1 }}
                                                >
                                                    {task}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Empty space for alternating layout */}
                        <div className="w-full md:w-5/12"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;