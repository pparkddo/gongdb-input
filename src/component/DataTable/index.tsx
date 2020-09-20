import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  data: GongdbInputData[]
  onRowClick: (index: number) => void
}

const DataTable = (props: Props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>회사명</th>
          <th>공고연도</th>
          <th>차수</th>
          <th>어학</th>
          <th>어학만점</th>
          <th>링크</th>
          <th>직군</th>
          <th>근무형태</th>
          <th>채용구분</th>
          <th>지역</th>
          <th>채용수준</th>
          <th>직급</th>
          <th>인원</th>
          <th>과목</th>
          <th>자격증</th>
          <th>학과</th>
          <th>NCS</th>
          <th>둘중하나</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((value, index) => (
            <tr 
              key={index} 
              data-key={index} 
              onClick={() => props.onRowClick(index)}
            >
              <td>{index+1}</td>
              <td>{value.companyName}</td>
              <td>{value.announcementTimestamp}</td>
              <td>{value.sequence}</td>
              <td>{value.languageScore}</td>
              <td>{value.perfectLanguageScore}</td>
              <td>{value.link}</td>
              <td>{value.position}</td>
              <td>{value.workingType}</td>
              <td>{value.recruitType}</td>
              <td>{value.districts}</td>
              <td>{value.recruitLevel}</td>
              <td>{value.rank}</td>
              <td>{value.headCount}</td>
              <td>{value.subjects}</td>
              <td>{value.certificates}</td>
              <td>{value.departments}</td>
              <td>{value.ncs}</td>
              <td>{typeof value.isEither === "boolean" ? String(value.isEither) : ""}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default DataTable;