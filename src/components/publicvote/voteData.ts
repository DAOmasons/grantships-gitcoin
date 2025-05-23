export const vectors = [
  {
    key: 'new_funding_mechanism',
    label: 'Innovating new allocation mechanisms is important',
    rating: 1,
  },
  {
    key: 'donations_received',
    label: 'Community donations received are important',
    rating: 1,
  },
  {
    key: 'additional_funds_raised',
    label: 'Additional matching funds raised are important',
    rating: 1,
  },
  {
    key: 'unique_donors',
    label: 'The number of unique donors is important',
    rating: 1,
  },
  {
    key: 'unique_projects',
    label: 'The number of unique projects funded is important',
    rating: 1,
  },
  {
    key: 'total_donations',
    label: 'Total funds raised is important',
    rating: 1,
  },
];

export type SliderData = {
  name: string;
  id: string;
  imgUrl: string;
  value: number;
  roundLink: string;
  reportLink: string;
};
