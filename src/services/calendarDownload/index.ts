import html2canvas from "html2canvas";
import { CalendarConfig } from "../../types/calendar-config.types";

export const downloadHtmlElementAsImage = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  const canvas = await html2canvas(element);
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.download = fileName;
  link.href = dataURL;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export const downloadCalendarConfigAsJson = (config: CalendarConfig, name: string) => {
  const configString = JSON.stringify(config, null, 2);
  const a = document.createElement('a');

  a.href = URL.createObjectURL( new Blob([configString], { type: 'application/json' }) );
  a.download = name;
  a.click();
}