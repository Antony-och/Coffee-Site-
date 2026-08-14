import React, { useState } from 'react';
import { COFFEE_PROCESS_STEPS, TEA_PROCESS_STEPS } from '../data/companyData';
import { Coffee, Leaf, ChevronRight, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

export const ProcessPipeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coffee' | 'tea'>('coffee');
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const activeSteps = activeTab === 'coffee' ? COFFEE_PROCESS_STEPS : TEA_PROCESS_STEPS;
  const currentStep = activeSteps[selectedStepIndex] || activeSteps[0];

  return (
    <section id="process" className="py-20 bg-[#2D241E] text-[#FAF7F2] relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5D6D3C]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5D6D3C]/20 border border-[#5D6D3C]/40 text-[#D4C3A3] text-xs font-bold uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5" />
            <span>Highland Quality Standards</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF7F2]">
            Interactive Production Pipeline
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3A3] leading-relaxed">
            Trace the rigorous, artisanal journey from high-altitude equatorial farm harvest to precision processing, dry milling, laboratory cupping, and export packaging.
          </p>

          {/* Toggle Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#4A3728] border border-[#E5E1DA]/20 shadow-xl mt-4">
            <button
              onClick={() => {
                setActiveTab('coffee');
                setSelectedStepIndex(0);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'coffee'
                  ? 'bg-[#D97706] text-white shadow-lg'
                  : 'text-[#D4C3A3] hover:text-white'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Coffee Harvest & Milling (6 Steps)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('tea');
                setSelectedStepIndex(0);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'tea'
                  ? 'bg-[#5D6D3C] text-white shadow-lg'
                  : 'text-[#D4C3A3] hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Tea Processing & Grading (6 Steps)</span>
            </button>
          </div>
        </div>

        {/* Pipeline Steps Tracker / Horizontal Stepper */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center min-w-max gap-2 sm:gap-4 px-2">
            {activeSteps.map((step, idx) => {
              const isActive = idx === selectedStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 text-left ${
                    isActive
                      ? activeTab === 'coffee'
                        ? 'bg-[#D97706] border-[#D4C3A3] text-white shadow-xl scale-105'
                        : 'bg-[#5D6D3C] border-[#D4C3A3] text-white shadow-xl scale-105'
                      : 'bg-[#4A3728]/90 border-[#E5E1DA]/20 text-[#D4C3A3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isActive
                        ? 'bg-white text-[#2D241E]'
                        : 'bg-white/10 text-[#D4C3A3]'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>
                  <div>
                    <span className="block text-xs font-bold leading-tight max-w-[130px] truncate">
                      {step.title}
                    </span>
                    <span className="block text-[10px] text-[#D4C3A3]/70 truncate">
                      {step.subtitle}
                    </span>
                  </div>
                  {idx < activeSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-[#D4C3A3]/40 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Spotlight Component */}
        <div className="bg-[#4A3728] border border-[#E5E1DA]/20 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Step Visual Image */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#E5E1DA]/20 group">
            <img
              src={currentStep.image}
              alt={currentStep.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-[#2D241E]/90 backdrop-blur-md border border-[#E5E1DA]/20 p-3 rounded-xl text-xs text-[#D4C3A3]">
              <span className="text-[#D97706] font-bold block mb-0.5 uppercase tracking-wider text-[10px]">
                Primary Processing Tool / Equipment
              </span>
              <span className="font-semibold text-white">{currentStep.keyTool}</span>
            </div>

            <div className="absolute top-4 left-4 bg-[#D97706] text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow">
              Step 0{currentStep.stepNumber} of 0{activeSteps.length}
            </div>
          </div>

          {/* Step Technical Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
                {currentStep.subtitle}
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                {currentStep.title}
              </h3>
              <p className="text-sm text-[#D4C3A3] leading-relaxed font-medium">
                {currentStep.description}
              </p>
            </div>

            <div className="bg-[#2D241E]/80 border border-[#E5E1DA]/20 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4C3A3] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5D6D3C]" />
                Technical Execution & Control
              </h4>
              <p className="text-xs text-[#D4C3A3]/90 leading-relaxed">
                {currentStep.detailedExecution}
              </p>
            </div>

            {/* Metrics Dashboard Grid */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4C3A3] block mb-3">
                Key Processing Metrics & Targets
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentStep.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2D241E] border border-[#E5E1DA]/20 p-3.5 rounded-xl text-center shadow"
                  >
                    <span className="block text-[10px] uppercase font-bold text-[#D4C3A3]/80 mb-1">
                      {metric.label}
                    </span>
                    <span className="font-serif-display text-sm font-extrabold text-[#FAF7F2]">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next / Prev Step Controls */}
            <div className="pt-2 flex justify-between items-center border-t border-[#E5E1DA]/20">
              <button
                disabled={selectedStepIndex === 0}
                onClick={() => setSelectedStepIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-bold text-[#D97706] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Previous Step
              </button>

              <div className="text-xs text-[#D4C3A3]/60 font-semibold">
                Click steps above or use arrows
              </div>

              <button
                disabled={selectedStepIndex === activeSteps.length - 1}
                onClick={() => setSelectedStepIndex((prev) => Math.min(activeSteps.length - 1, prev + 1))}
                className="text-xs font-bold text-[#D97706] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
