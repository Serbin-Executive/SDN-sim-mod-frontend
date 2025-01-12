export type TChartLabels = number[];
export interface IDataset {
    label: string;
    data: number[];
}
export type TDatasets = IDataset[];
export interface IChartData {
    labels: TChartLabels,
    datasets: TDatasets,
}

export interface IChartCurrentState {
    id: number;
    agentsCameSount: number | null;
    agentsCount: number;
    agentsLeftCount: number | null; 
}

export type TBarChartData = IChartCurrentState[];