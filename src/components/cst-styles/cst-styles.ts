import { css } from 'lit-element';
import CSTMilligram from '../cst-milligram/cst-milligram';
import CSTNormalize from '../cst-normalize/cst-normalize';

const CSTStyles = css`
  ${CSTNormalize}
  ${CSTMilligram}
`;

export { CSTStyles, CSTStyles as default };
