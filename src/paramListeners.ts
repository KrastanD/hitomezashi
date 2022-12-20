import Canvas from "./classCanvas";
import { getUrlParam } from "./utils";

function paramListeners(canvas: Canvas) {
  const hPattern = canvas.getHorizontalPattern();
  const vPattern = canvas.getVerticalPattern();
  //   if (backgroundOptions?.color) {
  //     backgroundProps.color = backgroundOptions.color;
  //   }

  const bgColor = getUrlParam("background");
  if (bgColor) {
    canvas.setBackgroundColor(bgColor);
  }

  //   if (verticalOptions) {
  //     verticalProps = verticalOptions;
  //   }

  //   if (horizontalOptions) {
  //     horizontalProps = horizontalOptions;
  //   }
  const hSeqType = getUrlParam("hSeqType");
  if (hSeqType) {
    horizontalProps.sequenceOptions.sequenceType = Number(hSeqType);
  }
  const hSeq = getUrlParam("hSeq");
  if (hSeq) {
    horizontalProps.sequenceOptions.sequence = hSeq;
  }
  const hStroke = getUrlParam("hStroke");
  if (hStroke) {
    horizontalProps.strokeOptions.color = hStroke;
  }

  const hStrokeType = getUrlParam("hStrokeType");
  if (hStrokeType) {
    horizontalProps.strokeOptions.stroke = Number(hStrokeType);
  }

  const hLegend = getUrlParam("hLegend");
  if (hLegend) {
    horizontalProps.sequenceOptions.isSequenceVisible =
      convertBooleanUrlParam(hLegend);
  }

  const vSeqType = getUrlParam("vSeqType");
  if (vSeqType) {
    verticalProps.sequenceOptions.sequenceType = Number(vSeqType);
  }
  const vSeq = getUrlParam("vSeq");
  if (vSeq) {
    verticalProps.sequenceOptions.sequence = vSeq;
  }
  const vStroke = getUrlParam("vStroke");
  if (vStroke) {
    verticalProps.strokeOptions.color = vStroke;
  }

  const vStrokeType = getUrlParam("vStrokeType");
  if (vStrokeType) {
    verticalProps.strokeOptions.stroke = Number(vStrokeType);
  }

  const vLegend = getUrlParam("vLegend");
  if (vLegend) {
    verticalProps.sequenceOptions.isSequenceVisible =
      convertBooleanUrlParam(vLegend);
  }
}

export default paramListeners;
