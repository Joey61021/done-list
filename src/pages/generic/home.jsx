import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const DATE = new Date();

    const TARGET = 10;
    var actual = 4;

    return (
        <div className="h-dvh px-30 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-2xl text-[var(--text)] font-bold">
                    Welcome back, <span className="font-bold text-[var(--primary)]">John</span>
                </p>
                <p className="text-2xl text-[var(--primary)]">
                    {DATE.getDate()}/{DATE.getMonth() + 1}/{DATE.getFullYear()}
                </p>
            </div>

            <div className="w-full h-0.5 bg-[var(--border)] my-6"></div>

            <p className="font-bold text-[var(--text)] text-xl">Let's see today's progress</p>
            <div className="h-10 w-full rounded-full my-5 bg-[var(--border)] relative">
                <p className="text-2xl text-[var(--text)] absolute inset-0 flex items-center justify-center">
                    {(actual / TARGET) * 100 + "%"}
                </p>
                <div
                    className="h-full bg-[var(--primary)] rounded-full transition-1s"
                    style={{ width: (actual / TARGET) * 100 + "%" }}
                ></div>
            </div>

            <div className="w-full h-15 rounded-2xl border-[var(--border)] border-1">
                
            </div>

            <div className="w-full h-0.5 bg-[var(--border)] my-6"></div>
        </div>
    );
}
